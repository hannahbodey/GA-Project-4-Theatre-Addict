from django.db import models
from django.core.validators import URLValidator
from django.db import models
from django.core.validators import URLValidator

# Create your models here.
class Musical(models.Model):
    name = models.CharField(max_length=200, unique=True)
    theatre = models.CharField(max_length=200)
    description = models.TextField(max_length=500)
    picture_1 = models.URLField(validators=[URLValidator()])
    picture_2 = models.URLField(validators=[URLValidator()])
    picture_3 = models.URLField(validators=[URLValidator()])
    video = models.URLField(validators=[URLValidator()])
    website = models.URLField(validators=[URLValidator()])
    genre = models.ManyToManyField('genres.Genre', related_name='genre')
    price_range = models.ManyToManyField('price_range.Price', related_name='price')