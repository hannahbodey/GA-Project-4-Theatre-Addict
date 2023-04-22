from django.db import models

# Create your models here.
class Message(models.Model):
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='sent')
    recipient = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='received')
    message = models.CharField(max_length=500)

    def __str__(self):
        return f'{self.owner} -> {self.recipient}'