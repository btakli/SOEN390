from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.

class UserManager(BaseUserManager):

    def create_user(self, email, password, **other_fields):
        other_fields.setdefault('is_staff', False)
        other_fields.setdefault('is_superuser', False)

        if not email:
            raise ValueError("You must provide an email address!")

        email = self.normalize_email(email)
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **other_fields)

class User(AbstractUser):
    is_doctor = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)

    is_pending_approval = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)

    username = None

    email = models.EmailField(
        unique=True,
        error_messages={
            'unique': "A user with that email already exists.",
        }
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    first_name = models.CharField(max_length=20, default='UNKNOWN')
    last_name = models.CharField(max_length=20, null=True)
    date_of_birth = models.DateField(null=True)

    GENDERS = [
        ('M', "Male"),
        ('F', "Female")
    ]
    gender = models.CharField(max_length=1, choices=GENDERS, null=True)
    
    address = models.CharField(max_length=20, null=True)
    city = models.CharField(max_length=20, null=True)
    postal_code = models.CharField(max_length=20, null=True)

    def upload_path(instance, filename):
        print(filename, instance)
        return f'proof/{instance.user.id}/%Y/%m/%D/{filename}'

    proof = models.ImageField(null=True, blank=True, upload_to=upload_path)

    def __str__(self):
        return f'Dr. {self.first_name}'

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=20, default='UNKNOWN')
    last_name = models.CharField(max_length=20, null=True)
    date_of_birth = models.DateField(null=True)

    GENDERS = [
        ('M', "Male"),
        ('F', "Female")
    ]
    gender = models.CharField(max_length=1, choices=GENDERS, null=True)
    
    address = models.CharField(max_length=20, null=True)
    city = models.CharField(max_length=20, null=True)
    postal_code = models.CharField(max_length=20, null=True)

    doctor = models.ForeignKey(
        Doctor, related_name="patients", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f'{self.first_name} ({self.user.id})'


    
