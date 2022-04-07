# Generated by Django 4.0.1 on 2022-04-07 07:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Healthy', 'Healthy'), ('Infected', 'Infected'), ('Recovered', 'Recovered')], default='Healthy', max_length=20)),
                ('soreThroat', models.BooleanField(default=False)),
                ('runnyNose', models.BooleanField(default=False)),
                ('sneezing', models.BooleanField(default=False)),
                ('cough', models.BooleanField(default=False)),
                ('diffBreathing', models.BooleanField(default=False)),
                ('highTemp', models.BooleanField(default=False)),
                ('fever', models.BooleanField(default=False)),
                ('chills', models.BooleanField(default=False)),
                ('fatigue', models.BooleanField(default=False)),
                ('muscleAche', models.BooleanField(default=False)),
                ('smellOrTasteLoss', models.BooleanField(default=False)),
                ('headache', models.BooleanField(default=False)),
                ('stomachPain', models.BooleanField(default=False)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('patient', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='statuses', to='accounts.patient')),
            ],
            options={
                'verbose_name': 'status',
                'verbose_name_plural': 'statuses',
            },
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254)),
                ('date_of_birth', models.DateField()),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='items', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('Email', 'Email'), ('Assignment', 'Assignment'), ('Appointment', 'Appointment'), ('InfectedAlert', 'InfectedAlert')], default='Email', max_length=20)),
                ('subject', models.CharField(max_length=30)),
                ('message', models.TextField(max_length=250)),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Availability',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('doctor', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='availabilities', to='accounts.doctor')),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='accounts.doctor')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='accounts.patient')),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('streetNumber', models.IntegerField()),
                ('streetName', models.CharField(max_length=30)),
                ('city', models.CharField(max_length=30)),
                ('province', models.CharField(max_length=30)),
                ('postalCode', models.CharField(max_length=30)),
                ('patient', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to='accounts.patient')),
            ],
        ),
    ]
