from django.contrib import admin

from .models import ComponentType
from .models import Chassis

admin.site.register(ComponentType)
admin.site.register(Chassis)
