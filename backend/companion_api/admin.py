"""Register your models here"""

from django.contrib import admin
from .models import Person

admin.site.register(Person)

if __name__ == "__main__":
    print(admin.checks)
