# Generated by Django 4.0.2 on 2022-02-21 22:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_delete_status'),
        ('companion_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Healthy', 'Healthy'), ('Infeected', 'Infected'), ('Recovered', 'Recovered')], default='Healthy', max_length=20)),
                ('patient', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='status', to='accounts.patient')),
            ],
        ),
    ]
