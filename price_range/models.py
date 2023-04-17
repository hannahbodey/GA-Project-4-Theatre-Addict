from django.db import models
from django.db import models

# Create your models here.
class Price(models.Model):
    cost = models.CharField(max_length=10)

    def __str__(self):
        return self.cost