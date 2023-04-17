from django.db import models

# Create your models here.
class Tips(models.Model):
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='theatre_tips')
    production = models.ForeignKey('musicals.Musical', on_delete=models.CASCADE, related_name='production')