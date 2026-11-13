from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import RetrieveUpdateAPIView

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import HostProfile, DriverProfile, VendorProfile
from .serializers import (
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



class HostProfileView(generics.RetrieveUpdateCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HostProfileSerializer

    def get_object(self):
        # Automatically returns the host profile if it exists, 
        # or raises a 404 on GET/PUT if they haven't applied yet (signaling the frontend to POST).
        return getattr(self.request.user, 'host_profile', None)

    def perform_create(self, serializer):
        # Automatically attaches the logged-in user when they POST (apply)
        serializer.save(user=self.request.user)


class DriverProfileView(generics.RetrieveUpdateCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DriverProfileSerializer

    def get_object(self):
        return getattr(self.request.user, 'host_profile', None)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VendorProfileView(generics.RetrieveUpdateCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VendorProfileSerializer

    def get_object(self):
        return getattr(self.request.user, 'host_profile', None)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)