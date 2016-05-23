from django.contrib import admin

from .models import SiteUser, Satellite

admin.site.register(SiteUser)
admin.site.register(Satellite)
