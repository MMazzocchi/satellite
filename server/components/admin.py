from django.contrib import admin

from .models import ComponentType
from .models import Chassis, CommDish, Batteries

admin.site.register(ComponentType)
admin.site.register(Chassis)
admin.site.register(CommDish)
admin.site.register(Batteries)
