from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import ListView
from django.db.models import Count
from django.contrib.auth.decorators import login_required

from components.models import ComponentType

@login_required
def index_view(request):
    context = {
        "component_types": ComponentType.objects.all(),
        "username": request.user.get_username()
    }

    return render(request, "html/index.html", context)   

@login_required
def stock_view(request):
    context = {
        'totalSatellites': request.user.siteuser.satellite_set.count(),
    }

    return render(request, "js/StockView.js", context)

@login_required
def satellite_view(request, num):
    satellites = request.user.siteuser.satellite_set
    context = {
        'valid': True
    }

    if satellites.count() < int(num):
        context['valid'] = False
    else:
        satellite = satellites.order_by('pk')[int(num)-1]
        context['name']        = satellite.name
        context['chassis']     = satellite.chassis.id
        context['commDish']    = satellite.commDish.id
        context['batteries']   = satellite.batteries.id
        context['solarPanels'] = satellite.solarPanels.id
        context['storage']     = satellite.storage.id
        context['sensors']     = satellite.sensors.id
        context['processor']   = satellite.processor.id
        context['fuelTank']    = satellite.fuelTank.id
        context['thrusters']   = satellite.thrusters.id

    return render(request, "json/satellite.json", context)

class BuildView(ListView):
    template_name = "js/BuildView.js"
    context_object_name = 'component_types'

    def get_queryset(self):
        return ComponentType.objects.all()
