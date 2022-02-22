# Generated by Django 4.0.2 on 2022-02-21 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='status',
            field=models.CharField(choices=[('Healthy', 'Healthy'), ('Sick', 'Sick'), ('Recovering', 'Recovering')], default='Healthy', max_length=20),
        ),
    ]
