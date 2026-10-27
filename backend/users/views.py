from django.shortcuts import render
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail

import os
from urllib.parse import urlencode

from .serializers import UserSerializer, ForgotPasswordSerializer, ResetPasswordSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

# For LoginView
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

class RegisterUserView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    parser_classes = [JSONParser, MultiPartParser, FormParser]


# Login View
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)

        if user is None:
            return Response({
                "error": "Invalid username or password!"
            }, status=status.HTTP_401_UNAUTHORIZED
            )

        if user.is_suspended:
            return Response({
                "error": "This account is suspended.Please contact admin"
            }, status=status.HTTP_403_FORBIDDEN
            )

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        },status=status.HTTP_200_OK
        )



# FORGOT PASSWORD VIEW
class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')

        User = get_user_model()
        user = User.objects.filter(email=email).first()
        

        if user:
            token = PasswordResetTokenGenerator().make_token(user)
            frontend_url = os.environ.get('FRONTEND_URL', '').rstrip('/')
            uid = user.id
            query = urlencode(
                {
                    'uid': uid,
                    'token': token
                }
            )
            reset_link = (f"{frontend_url}/reset-password/?{query}")

            # Send the reset link to the user's email
            send_mail(
                subject='Password Reset Request',
                message=f'Click the link to reset your password: {reset_link}',
                from_email=os.environ.get('RESET_EMAILER'),
                recipient_list=[user.email],
            )

            return Response(
                {
                    "message": "Password reset link sent to your email."
                }, status=status.HTTP_200_OK)
        return Response(
            {
                "error": "Invalid Request."
            }, status=status.HTTP_404_NOT_FOUND
        )

# RESET PASSWORD VIEW
class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            uid = serializer.validated_data.get('uid')
            token = serializer.validated_data.get('token')
            new_password = serializer.validated_data.get('new_password')

            User = get_user_model()
            user = User.objects.filter(id=uid).first()

            if user and PasswordResetTokenGenerator().check_token(user, token):
                validate_password(new_password, user)
                user.set_password(new_password)
                user.save()
                return Response(
                    {
                        "message": "Password reset successful."
                    }, status=status.HTTP_200_OK)
            return Response(
                {
                    "error": "Invalid token or user ID."
                }, status=status.HTTP_400_BAD_REQUEST
            )