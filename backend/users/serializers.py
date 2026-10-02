from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    # Map frontend payload keys if they differ from model field names
    user_type = serializers.CharField(source='role', required=False, write_only=True)
    phone = serializers.CharField(source='phone_number', required=False, write_only=True)

    class Meta:
        model = User
        fields = [
            'full_name',
            'email',
            'phone',
            'phone_number',
            'user_type',
            'role',
            'password',
            'confirm_password',
            'country',
            'id_type',
            'citizenship_card',
            'profile_photo'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'phone_number': {'required': False, 'allow_null': True, 'allow_blank': True},
            'role': {'required': False},
            'country': {'required': False},
            'id_type': {'required': False},
            'citizenship_card': {'required': False},
        }

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError({"password": "Password fields do not match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)

        password = validated_data.pop('password')
        email = validated_data.get('email')

        validated_data['username'] = email
        user = User.objects.create_user(password=password, **validated_data)
        return user