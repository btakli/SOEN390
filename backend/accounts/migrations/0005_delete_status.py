# Generated by Django 4.0.2 on 2022-02-21 22:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_status_remove_patient_status'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Status',
        ),
    ]
