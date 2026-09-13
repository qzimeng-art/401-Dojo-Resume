from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
import os
from django.contrib.auth import get_user_model
User = get_user_model()

from .models import Application, ApplicationFile, Review, MasterResume
from .serializers import ApplicationSerializer, ApplicationFileSerializer, ReviewSerializer, MasterResumeSerializer

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.core.mail import send_mail

class AutoApplyView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        company = request.data.get('company', 'Unknown Company')
        position = request.data.get('position', 'Unknown Position')
        job_url = request.data.get('job_url', '')

        # Fallback to demo user if unauthenticated (for the hackathon demo)
        if request.user and request.user.is_authenticated:
            target_user = request.user
        else:
            target_user, _ = User.objects.get_or_create(
                username='demo_user',
                defaults={'email': 'demo@example.com'}
            )

        # Create application in Applied state
        application = Application.objects.create(
            user=target_user,
            company_name=company,
            position_title=position,
            job_post_url=job_url,
            status='Applied'
        )

        # Send exciting mock email
        subject = f"🎉 We applied to {company} for you! You're a great fit! 🎆"
        message = (
            f"Hi {target_user.username},\n\n"
            f"We automatically submitted your resume to {company} for the {position} role!\n\n"
            f"Your skills and experience were a fantastic match. We wanted to impress the judges and show you how easy JobDojo makes the application process.\n\n"
            f"Check it out on your board:\n"
            f"{job_url}\n\n"
            f"Best of luck,\n"
            f"The JobDojo Team"
        )
        send_mail(
            subject,
            message,
            'teamcommonworks@gmail.com',
            ['ilya.sukhanovv@gmail.com'],
            fail_silently=False,
        )

        serializer = ApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return applications belonging to the current user
        return self.request.user.applications.all()

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        # Automatically set the user to the current logged-in user
        serializer.save(user=self.request.user)

class ApplicationFileViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ApplicationFile.objects.filter(application__user=self.request.user)

    def perform_create(self, serializer):
        application = serializer.validated_data.get('application')
        if application.user != self.request.user:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You do not own this application.")
        serializer.save()

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = os.getenv("GOOGLE_CALLBACK_URL", "https://api.jobtrackerr.com/accounts/google/login/callback/")
    client_class = OAuth2Client

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    
    def get_permissions(self):
        if self.action == 'list':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        if self.action == 'list':
            return Review.objects.filter(is_public=True).order_by('-created_at')
        return Review.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DeleteAccountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"detail": "Account deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class MasterResumeViewSet(viewsets.ModelViewSet):
    serializer_class = MasterResumeSerializer
    permission_classes = [permissions.AllowAny]

    def _get_target_user(self):
        if self.request.user and self.request.user.is_authenticated:
            return self.request.user
        demo_user, _ = User.objects.get_or_create(
            username='demo_user',
            defaults={'email': 'demo@example.com'}
        )
        return demo_user

    def get_queryset(self):
        target_user = self._get_target_user()
        return MasterResume.objects.filter(user=target_user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"detail": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)
        
        filename = file_obj.name.lower()
        if not (filename.endswith('.pdf') or filename.endswith('.doc') or filename.endswith('.docx')):
            return Response({"detail": "Only PDF and Word documents (.pdf, .doc, .docx) are supported."}, status=status.HTTP_400_BAD_REQUEST)

        file_type = 'PDF' if filename.endswith('.pdf') else ('DOCX' if filename.endswith('.docx') else 'DOC')
        
        target_user = self._get_target_user()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Mock parsed text for the hackathon demo
        mock_parsed_text = (
            "JOHN DOE\n"
            "Software Engineer\n\n"
            "EXPERIENCE\n"
            "Senior Developer at Tech Corp (2020 - Present)\n"
            "- Built scalable microservices using Python and Django\n"
            "- Led a team of 5 engineers to deliver the new SaaS platform\n\n"
            "EDUCATION\n"
            "B.S. Computer Science, State University\n\n"
            "SKILLS\n"
            "Python, Django, React, SQL, AWS"
        )
        
        master_resume = serializer.save(
            user=target_user,
            file_type=file_type,
            original_filename=file_obj.name,
            file_size=file_obj.size,
            parsed_text=mock_parsed_text
        )
        return Response({
            "message": "Master resume uploaded successfully!",
            "data": MasterResumeSerializer(master_resume).data
        }, status=status.HTTP_201_CREATED)