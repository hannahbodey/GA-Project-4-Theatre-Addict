from django.contrib import admin
from django.urls import path, include
from .views import RegisterView, LogInView, ProfileView, UpdateProfileView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LogInView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('profile/<int:pk>/', UpdateProfileView.as_view())
]