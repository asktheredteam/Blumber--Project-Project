from django.urls import path, include
from .views import NormalUserProfileView


urlpatterns = [
    # Normal User Profile endpoint (GET / PATCH / PUT)
    path('me/', NormalUserProfileView.as_view(), name='normal-user-profile'),
    # Host Profile endpoint (GET / PATCH / PUT / POST)
    path('hosts/', HostProfileView.as_view(), name='host-profile'),
    # Driver Profile endpoint (GET / PATCH / PUT / POST)
    path('drivers/', DriverProfileView.as_view(), name='driver-profile'),
    # Vendor Profile endpoint (GET / PATCH / PUT / POST)
    path('vendors/', VendorProfileView.as_view(), name='vendor-profile'),
]
