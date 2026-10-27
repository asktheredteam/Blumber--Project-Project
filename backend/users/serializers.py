from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'full_name',
            'email',
            'phone_number',
            'password',
            'confirm_password',
            'country',
            'profile_photo'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'phone_number': {'required': False, 'allow_null': True, 'allow_blank': True},
            'country': {'required': False},
            'profile_photo': {'required': False},
        }

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError({"password": "Password fields do not match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        password = validated_data.pop('password')
        email = validated_data.get('email')

        # Automatically use email as username behind the scenes
        validated_data['username'] = email
        user = User.objects.create_user(password=password, **validated_data)
        return user



class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    class Meta:
        fields = ['email']

class ResetPasswordSerializer(serializers.Serializer):
    uid = serializers.IntegerField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)   
    