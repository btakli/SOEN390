# Generated by Django 4.0.2 on 2022-02-21 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_patient_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Healthy', 'Healthy'), ('Infeected', 'Infected'), ('Recovered', 'Recovered')], default='Healthy', max_length=20)),
            ],
        ),
        migrations.RemoveField(
            model_name='patient',
            name='status',
        ),
    ]
