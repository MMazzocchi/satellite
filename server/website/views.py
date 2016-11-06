from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import ListView
from django.db.models import Count
from django.contrib.auth.decorators import login_required

from components.models import ComponentType
from components.models import Chassis, CommDish, Batteries, SolarPanels
from components.models import Storage, Sensors, Processor, FuelTank
from components.models import Thrusters

from .models import Satellite

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
        'component_types': ComponentType.objects.all(),
        'total_satellites': request.user.siteuser.satellite_set.count(),
    }

    return render(request, "js/StockView.js", context)

def jobs_js_view(request):
    context = {
    }

    return render(request, "js/JobsView.js", context)

def template_view(request, title):
    return render(request, "jquery_templates/"+title)

@login_required
def satellite_view(request, num):
    satellites = request.user.siteuser.satellite_set
    context = {
        'valid': True
    }

    if satellites.count() < int(num):
        context['valid'] = False
    else:
        # TODO: Fix this
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
        if satellite.job != None:
          context['job']         = satellite.job.id
        else:
          context['job']         = -1

    return render(request, "json/satellite.json", context)

@login_required
def user_view(request):
    context = {
        'valid': True,
        "username": request.user.get_username(),
        'user': request.user.siteuser,
        'total_satellites': request.user.siteuser.satellite_set.count()
    }

    return render(request, "json/user.json", context)

@login_required
def jobs_view(request):
    context = {
        'valid': True,
        'jobs': request.user.siteuser.job_set.all()
    }

    return render(request, "json/jobs.json", context)

@login_required
def purchase_view(request):

    context = {
        'valid': False
    }

    # Make sure we got all the data we need
    if 'chassis'     in request.POST and 'commDish'    in request.POST and \
       'batteries'   in request.POST and 'solarPanels' in request.POST and \
       'solarPanels' in request.POST and 'storage'     in request.POST and \
       'processor'   in request.POST and 'fuelTank'    in request.POST and \
       'thrusters'   in request.POST and 'name'        in request.POST:

        chassis_id     = int(request.POST['chassis'])
        commDish_id    = int(request.POST['commDish'])
        batteries_id   = int(request.POST['batteries'])
        solarPanels_id = int(request.POST['solarPanels'])
        storage_id     = int(request.POST['storage'])
        sensors_id     = int(request.POST['sensors'])
        processor_id   = int(request.POST['processor'])
        fuelTank_id    = int(request.POST['fuelTank'])
        thrusters_id   = int(request.POST['thrusters'])

        name = request.POST['name']

        types = ComponentType.objects
        # Make sure all the ids we got are valid
        # TODO make this a try/catch
        if chassis_id     >  0                                   and \
           chassis_id     <= types.get(name="chassis").total     and \
           commDish_id    >  0                                   and \
           commDish_id    <= types.get(name="commDish").total    and \
           batteries_id   >  0                                   and \
           batteries_id   <= types.get(name="batteries").total   and \
           solarPanels_id >  0                                   and \
           solarPanels_id <= types.get(name="solarPanels").total and \
           storage_id     >  0                                   and \
           storage_id     <= types.get(name="storage").total     and \
           sensors_id     >  0                                   and \
           sensors_id     <= types.get(name="sensors").total     and \
           processor_id   >  0                                   and \
           processor_id   <= types.get(name="processor").total   and \
           fuelTank_id    >  0                                   and \
           fuelTank_id    <= types.get(name="fuelTank").total    and \
           thrusters_id   >  0                                   and \
           thrusters_id   <= types.get(name="thrusters").total:

            # Make sure the user has enough money for this purchase
            money = request.user.siteuser.money

            chassis     = Chassis.objects.get(    pk=chassis_id)
            commDish    = CommDish.objects.get(   pk=commDish_id)
            batteries   = Batteries.objects.get(  pk=batteries_id)
            solarPanels = SolarPanels.objects.get(pk=solarPanels_id)
            storage     = Storage.objects.get(    pk=storage_id)
            sensors     = Sensors.objects.get(    pk=sensors_id)
            processor   = Processor.objects.get(  pk=processor_id)
            fuelTank    = FuelTank.objects.get(   pk=fuelTank_id)
            thrusters   = Thrusters.objects.get(  pk=thrusters_id)

            cost = 0
            cost += chassis.cost     + commDish.cost + batteries.cost + \
                    solarPanels.cost + storage.cost  + sensors.cost   + \
                    processor.cost   + fuelTank.cost + thrusters.cost

            if money >= cost:
                # This is a valid purchase. Let's make it happen.
                satellite = Satellite(owner=request.user.siteuser,
                                      name=name,
                                      chassis=chassis,
                                      commDish=commDish,
                                      batteries=batteries,
                                      solarPanels=solarPanels,
                                      storage=storage,
                                      sensors=sensors,
                                      processor=processor,
                                      fuelTank=fuelTank,
                                      thrusters=thrusters)
                satellite.save()

                request.user.siteuser.money -= cost
                request.user.siteuser.save()

                context['valid'] = True
                context['id'] = request.user.siteuser.satellite_set.count()
            else:
                context['error'] = "Not enough money to make this purchase."
        else:
            context['error'] = "A bad request was recieved."
    else:
        context['error'] = "A bad request was recieved."
    return render(request, "json/purchase.json", context)

class BuildView(ListView):
    template_name = "js/BuildView.js"
    context_object_name = 'component_types'

    def get_queryset(self):
        return ComponentType.objects.all()
