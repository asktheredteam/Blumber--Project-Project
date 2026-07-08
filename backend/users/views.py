from django.shortcuts import render

from .serializers import UserSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

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
    parser_classes = [MultiPartParser,FormParser]


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
            "role": user.role
        },status=status.HTTP_200_OK
        )