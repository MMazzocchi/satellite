from django.contrib import admin

from .models import ComponentType
from .models import Chassis, CommDish, Batteries, SolarPanels, Storage, Sensors

admin.site.register(ComponentType)
admin.site.register(Chassis)
admin.site.register(CommDish)
admin.site.register(Batteries)
admin.site.register(SolarPanels)
admin.site.register(Storage)
admin.site.register(Sensors)
