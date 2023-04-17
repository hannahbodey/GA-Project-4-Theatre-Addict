from django.db import models
from django.db import models

# Create your models here.
class Price(models.Model):
    cost = models.FloatField(max_length=10)