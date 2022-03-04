"""Register your models here"""

from django.contrib import admin
from .models import Person, Status
from django.urls import reverse
from django.utils.html import format_html

class StatusAdmin(admin.ModelAdmin):
    list_display = ("__str__", 'patient_', 'date')
    list_filter = ('patient',)
    model = Status
    search_fields = ("patient__first_name__startswith", ) #Search field (later can add different attributes?)
    empty_value_display = 'No Patient'

    def patient_(self, obj):
        if obj.patient:
            link = reverse(
                "admin:accounts_patient_change", args=[obj.patient.user_id]
            )  # model name has to be lowercase
            return format_html(u'<a href="%s">%s</a>' % (link, obj.patient))
        else:
            return None

# admin.site.register(Person)
admin.site.register(Status, StatusAdmin)
