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
def satellite_view(request, pk):
    satellites = request.user.siteuser.satellite_set
    context = {
        'valid': True
    }

    if satellites.count() < int(pk):
        context['valid'] = False
    else:
        context['name']        = "name"
        context['chassis']     = 1
        context['commDish']    = 1
        context['batteries']   = 1
        context['solarPanels'] = 1
        context['storage']     = 1
        context['sensors']     = 1
        context['processor']   = 1
        context['fuelTank']    = 1
        context['thrusters']   = 1

    return render(request, "json/satellite.json", context)

class BuildView(ListView):
    template_name = "js/BuildView.js"
    context_object_name = 'component_types'

    def get_queryset(self):
        return ComponentType.objects.all()
