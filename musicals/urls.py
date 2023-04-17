from django.contrib import admin
from django.urls import path, include
from .views import MusicalListView, SingleMusicalView

urlpatterns = [
    path('', MusicalListView.as_view()),
    path('<int:pk>/', SingleMusicalView.as_view()),
]