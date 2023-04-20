from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import URLValidator

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=15, unique=True)
    email = models.CharField(max_length=30, unique=True)
    profileimage = models.URLField(validators=[URLValidator()], max_length=400)