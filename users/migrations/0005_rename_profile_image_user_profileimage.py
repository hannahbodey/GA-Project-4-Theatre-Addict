# Generated by Django 4.2 on 2023-04-19 13:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_user_profile_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='profile_image',
            new_name='profileimage',
        ),
    ]
