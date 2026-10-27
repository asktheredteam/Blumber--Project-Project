from django.urls import path, include
from .views import (
    ForgotPasswordView,
    LoginAPIView,
    RegisterUserView,
    ResetPasswordView,
)


urlpatterns = [
    path('register/',RegisterUserView.as_view(), name='register'),
    path('login/',LoginAPIView.as_view(), name='login'),
    # Password reset endpoints
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
]