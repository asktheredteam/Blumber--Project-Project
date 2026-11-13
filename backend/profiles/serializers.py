from rest_framework import serializers
from .models import HostProfile, DriverProfile, VendorProfile
from users.models import User


class NormalUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id', 'username', 'email']



class HostProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostProfile
        fields = ['id', 'id_type', 'citizenship_card', 'business_name', 'is_verified']
        read_only_fields = ['id', 'is_verified']

    def create(self, validated_data):
        user = self.context['request'].user
        return HostProfile.objects.create(user=user, **validated_data)


class DriverProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverProfile
        fields = ['id', 'drivers_license', 'license_number', 'is_verified', 'is_online']
        read_only_fields = ['id', 'is_verified', 'is_online']

    def create(self, validated_data):
        user = self.context['request'].user
        return DriverProfile.objects.create(user=user, **validated_data)


class VendorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorProfile
        fields = ['id', 'store_name', 'category', 'store_address', 'is_verified']
        read_only_fields = ['id', 'is_verified']

    def create(self, validated_data):
        user = self.context['request'].user
        return VendorProfile.objects.create(user=user, **validated_data)