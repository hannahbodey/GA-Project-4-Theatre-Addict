"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from .views import index
from django.views.generic.base import RedirectView

favicon_view = RedirectView.as_view(url='client/build/static/favicon.ico', permanent=True)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/musicals/', include('musicals.urls')),
    path('api/musicals/<int:pk>/comments/', include('theatre_tips.urls')),
    path('api/genres/', include('genres.urls')),
    path('api/auth/', include('users.urls')),
    path('api/messages/', include('messaging.urls')),
    path('favicon.ico', favicon_view),
    re_path(r'^.*$', index)
]
