# Generated by Django 4.0.1 on 2022-02-23 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_is_pending'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='is_pending',
            new_name='is_pending_approval',
        ),
        migrations.AddField(
            model_name='user',
            name='is_email_verified',
            field=models.BooleanField(default=False),
        ),
    ]