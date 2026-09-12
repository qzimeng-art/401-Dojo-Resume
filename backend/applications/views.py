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
        master_resume = serializer.save(
            user=target_user,
            file_type=file_type,
            original_filename=file_obj.name,
            file_size=file_obj.size
        )
        return Response({
            "message": "Master resume uploaded successfully!",
            "data": MasterResumeSerializer(master_resume).data
        }, status=status.HTTP_201_CREATED)