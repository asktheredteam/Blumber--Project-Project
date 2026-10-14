from django.db import models
from users.models import User
# Create your models here.

class HostProfile(models.Model):
    """For users listing homes or hotels (Rent Homes, Book Hotels)"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='host_profile')
    id_type = models.CharField(max_length=20, choices=[('national_id', 'National ID'), ('voters_id', 'Voters ID')])
    citizenship_card = models.ImageField(upload_to='identity_cards/')
    is_verified = models.BooleanField(default=False)
    business_name = models.CharField(max_length=255, blank=True, null=True) # Useful for hotels

    def __str__(self):
        return f"Host: {self.user.email}"


class DriverProfile(models.Model):
    """For users offering transportation (Book Rides)"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='driver_profile')
    drivers_license = models.ImageField(upload_to='driver_licenses/')
    license_number = models.CharField(max_length=50, unique=True)
    is_verified = models.BooleanField(default=False)
    is_online = models.BooleanField(default=False)

    def __str__(self):
        return f"Driver: {self.user.email}"


class VendorProfile(models.Model):
    """For restaurants and local service providers (Find Restaurants, Local Services)"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='vendor_profile')
    store_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100) # e.g., 'Restaurant', 'Plumber', 'Electronics'
    store_address = models.TextField()
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"Vendor: {self.store_name}"