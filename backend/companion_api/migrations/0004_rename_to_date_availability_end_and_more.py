# Generated by Django 4.0.1 on 2022-04-06 21:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('companion_api', '0003_alter_availability_doctor_alter_status_patient'),
    ]

    operations = [
        migrations.RenameField(
            model_name='availability',
            old_name='to_date',
            new_name='end',
        ),
        migrations.RenameField(
            model_name='availability',
            old_name='from_date',
            new_name='start',
        ),
    ]
