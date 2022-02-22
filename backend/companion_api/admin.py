"""Register your models here"""

from django.contrib import admin
from .models import Person, Status

class StatusAdmin(admin.ModelAdmin):
    list_display = ("__str__", 'date')
    list_filter = ('patient',)
    model = Status
    search_fields = ("patient__first_name__startswith", ) #Search field (later can add different attributes?)
    empty_value_display = 'NO VALUE HERE :)'

admin.site.register(Person)
admin.site.register(Status, StatusAdmin)
