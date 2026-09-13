from django.contrib import admin
from django.urls import path, include  # Added include here
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from applications.views import ApplicationViewSet, ApplicationFileViewSet, ReviewViewSet, DeleteAccountView, MasterResumeViewSet
from applications.views import GoogleLogin, AutoApplyView

#  JWT Authentication
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
) 

router = routers.DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='application')
router.register(r'files', ApplicationFileViewSet, basename='file')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'master-resume', MasterResumeViewSet, basename='master-resume')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/applications/auto-apply/', AutoApplyView.as_view(), name='auto-apply'),
    path('api/', include(router.urls)),
    
    # Auth Endpoints
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('api/auth/delete/', DeleteAccountView.as_view(), name='delete_account'),
    
    # Allauth URLs for Google OAuth callbacks
    path('accounts/', include('allauth.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)