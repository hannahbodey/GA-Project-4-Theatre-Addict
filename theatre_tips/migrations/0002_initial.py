# Generated by Django 4.2 on 2023-04-17 08:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('musicals', '0001_initial'),
        ('theatre_tips', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='tips',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='theatre_tips', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='tips',
            name='production',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='production', to='musicals.musical'),
        ),
    ]
