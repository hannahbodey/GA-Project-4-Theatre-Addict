from django.db import models
from django.core.validators import URLValidator
from django.db import models
from django.core.validators import URLValidator

# Create your models here.
class Musical(models.Model):
    name = models.CharField(max_length=500, unique=True)
    theatre = models.CharField(max_length=300)
    description = models.TextField(max_length=1000)
    picture_1 = models.URLField(validators=[URLValidator()], max_length=500)
    picture_2 = models.URLField(validators=[URLValidator()], max_length=500)
    picture_3 = models.URLField(validators=[URLValidator()], max_length=500)
    video = models.URLField(validators=[URLValidator()], max_length=500)
    website = models.URLField(validators=[URLValidator()], max_length=500)
    genre = models.ManyToManyField('genres.Genre', related_name='genre')
    price_range = models.ManyToManyField('price_range.Price', related_name='price')

    def __str__(self):
        return self.name