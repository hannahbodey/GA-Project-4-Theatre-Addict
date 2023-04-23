from django.contrib import admin
from django.urls import path, include
from .views import MessageView

urlpatterns = [
    path('<int:pk>/', MessageView.as_view())
]