from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("companion_api.urls", namespace="companion_api")),
    path("", include("accounts.urls", namespace="accounts")),
]
