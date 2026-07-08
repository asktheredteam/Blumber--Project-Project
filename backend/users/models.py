from django.db import models
from django_countries.fields import CountryField

from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    country = CountryField(default='GH')
    ID_CHOICES = [
        ('national_id','National ID'),
        ('voters_id','Voters ID'),
        ('drivers_license','Drivers License')
    ]
    id_type = models.CharField(max_length=20,choices=ID_CHOICES, default='national_id')
    citizenship_card = models.ImageField(upload_to='identity_cards/')
    profile_photo = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name', 'phone_number']
    ROLE_CHOICES = [
        ('landlord', 'Landlord'),
        ('tenant', 'Tenant')
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='tenant')
    # Fields invisible to the frontend
    is_verified = models.BooleanField(default=False, help_text="True if landlord citizenship card is verified")
    is_suspended = models.BooleanField(default=False, help_text="Kill switch for scammers")


    def __str__(self):
        return self.email