from django.contrib import admin
from django.urls import path, include
from .views import GenreView

urlpatterns = [
    path('', GenreView.as_view()),
    ]