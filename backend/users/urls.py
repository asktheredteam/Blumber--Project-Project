from django.urls import path, include
from  .views import LoginAPIView, RegisterUserView


urlpatterns = [
    path('register/',RegisterUserView.as_view(), name='register'),
    path('login/',LoginAPIView.as_view(), name='login')
]