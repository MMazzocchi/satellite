from django.contrib import admin

from .models import ComponentType
from .models import Chassis
from .models import CommDish

admin.site.register(ComponentType)
admin.site.register(Chassis)
admin.site.register(CommDish)
