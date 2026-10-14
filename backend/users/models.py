from django.db import models
from django_countries.fields import CountryField

from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    country = CountryField(default='GH', null=True, blank=True)
    profile_photo = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    
    is_suspended = models.BooleanField(default=False, help_text="Kill switch for scammers")

    def __str__(self):
        return self.email