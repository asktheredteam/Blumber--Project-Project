from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import HostProfile, DriverProfile, VendorProfile
from .serializers import (
    NormalUserProfileSerializer,
    HostProfileSerializer, 
    DriverProfileSerializer, 
    VendorProfileSerializer
)

# Create your views here.
class NormalUserProfileView(RetrieveUpdateAPIView):
    authentication_classes = [IsAuthenticated]
    serializer_class = NormalUserProfileSerializer

    def get_object(self):
        return self.request.user



class HostProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Safely get the profile or return 404
        profile = getattr(request.user, 'host_profile', None)
        if not profile:
            return Response({"detail": "Host profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = HostProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        # Prevent duplicate creation
        if hasattr(request.user, 'host_profile'):
            return Response({"detail": "Host profile already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = HostProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        profile = getattr(request.user, 'host_profile', None)
        if not profile:
            return Response({"detail": "Host profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = HostProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DriverProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Safely get the profile or return 404
        profile = getattr(request.user, 'driver_profile', None)
        if not profile:
            return Response({"detail": "Driver profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = DriverProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        # Prevent duplicate creation
        if hasattr(request.user, 'driver_profile'):
            return Response({"detail": "Driver profile already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = DriverProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        profile = getattr(request.user, 'driver_profile', None)
        if not profile:
            return Response({"detail": "Driver profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = DriverProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VendorProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Safely get the profile or return 404
        profile = getattr(request.user, 'vendor_profile', None)
        if not profile:
            return Response({"detail": "Vendor profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = VendorProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        # Prevent duplicate creation
        if hasattr(request.user, 'vendor_profile'):
            return Response({"detail": "Vendor profile already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = VendorProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        profile = getattr(request.user, 'vendor_profile', None)
        if not profile:
            return Response({"detail": "Vendor profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = VendorProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)