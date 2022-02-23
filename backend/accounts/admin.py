from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.urls import reverse
from .models import User, Doctor, Patient

from django.template.response import TemplateResponse
from django.utils.translation import gettext_lazy

ADMIN_NAME = "CovidTracker"


class DoctorAdmin(admin.ModelAdmin):
    """Doctor Admin Model"""
    list_display = ("__str__", "user_", "number_of_patients")
    list_filter = ("user__is_active", "user__is_pending")
    model = Doctor
    search_fields = (
        "first_name__startswith",
    )  # Search field (later can add different attributes?)
    empty_value_display = 'NO VALUE HERE :)'

    def user_(self, obj):
        link = reverse(
            "admin:accounts_user_change", args=[obj.user.id]
        )  # model name has to be lowercase
        return format_html(u'<a href="%s">%s</a>' % (link, obj.user))

    def number_of_patients(self, obj):
        return len(Patient.objects.filter(doctor__user_id=obj.user_id))


class PatientAdmin(admin.ModelAdmin):
    """Patient Admin Model"""
    list_display = ("__str__", "user_", "doctor_")
    list_filter = ("doctor",)
    search_fields = (
        "first_name__startswith",
    )  # Search field (later can add different attributes?)
    empty_value_display = 'NO VALUE HERE :)'

    def user_(self, obj):
        link = reverse(
            "admin:accounts_user_change", args=[obj.user.id]
        )  # model name has to be lowercase
        return format_html(u'<a href="%s">%s</a>' % (link, obj.user))

    def doctor_(self, obj):
        if obj.doctor:
            link = reverse(
                "admin:accounts_doctor_change", args=[obj.doctor.user_id]
            )  # model name has to be lowercase
            return format_html(u'<a href="%s">%s</a>' % (link, obj.doctor))
        else:
            return None

    # view_on_site = False


# Set custom admin page titles
# Text to put at the end of each page's <title>.
admin.site.site_title = gettext_lazy(f'{ADMIN_NAME} site admin')
# Text to put in each page's <h1>.
admin.site.site_header = gettext_lazy(f'{ADMIN_NAME} Administration')
# Text to put at the top of the admin index page.
admin.site.index_title = gettext_lazy(f'{ADMIN_NAME} Administration')

admin.site.register(Doctor, DoctorAdmin)
admin.site.register(User) # At the moment you cannot register users correctly in the Admin UI
                            # since you need to override the UserAdmin class in Django
                            # Not a priority at the moment, use current API instead. 
admin.site.register(Patient, PatientAdmin)
