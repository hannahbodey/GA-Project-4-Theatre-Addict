from django.contrib import admin
from django.urls import path, include
from .views import TipsView, SingleTipView

urlpatterns = [
    path('', TipsView.as_view()),
    path('<int:pk>', SingleTipView.as_view())
]