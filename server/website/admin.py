from django.contrib import admin

from .models import SiteUser, Satellite, Job

admin.site.register(SiteUser)
admin.site.register(Satellite)
admin.site.register(Job)
