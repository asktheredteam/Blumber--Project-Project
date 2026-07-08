from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['full_name','email','phone_number','country', 'id_type', 'citizenship_card','password','confirm_password', 'profile_photo', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # Validating the password
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields do not match"})
        return attrs

    # Creating the user
    def create(self, validated_data):
        validated_data.pop('confirm_password')

        email = validated_data.get('email')
        validated_data['username'] = email
        user = User.objects.create_user(**validated_data)
        return user