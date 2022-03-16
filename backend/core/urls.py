from argparse import Namespace
from unicodedata import name
from django.contrib import admin
from django.urls import re_path, path, include
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("companion_api.urls", namespace="companion_api")),
    path("", include("accounts.urls", namespace="accounts")),
]

urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT
    }, name='media')
]
