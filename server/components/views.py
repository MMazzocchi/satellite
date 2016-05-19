from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views import generic

from .models import Chassis, CommDish, Batteries, SolarPanels, Storage, Sensors
from .models import Processor

def index(request):
    return HttpResponse("Hello, welcome to the index.")

class ChassisView(generic.DetailView):
    model = Chassis
    context_object_name = 'instance_data'
    template_name = "components/chassis.json"

class CommDishView(generic.DetailView):
    model = CommDish
    context_object_name = 'instance_data'
    template_name = "components/comm_dish.json"

class BatteriesView(generic.DetailView):
    model = Batteries
    context_object_name = 'instance_data'
    template_name = "components/batteries.json"

class SolarPanelsView(generic.DetailView):
    model = SolarPanels
    context_object_name = 'instance_data'
    template_name = "components/solar_panels.json"

class StorageView(generic.DetailView):
    model = Storage
    context_object_name = 'instance_data'
    template_name = "components/storage.json"

class SensorsView(generic.DetailView):
    model = Sensors
    context_object_name = 'instance_data'
    template_name = "components/sensors.json"

class ProcessorView(generic.DetailView):
    model = Processor
    context_object_name = 'instance_data'
    template_name = "components/processor.json"
