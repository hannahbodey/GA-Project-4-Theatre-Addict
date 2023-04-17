from django.db import models
from django.db import models

# Create your models here.
class Genre(models.Model):
    category = models.CharField(max_length=30)

    def __str__(self):
        return self.category