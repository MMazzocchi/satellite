from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views import generic

from .models import Chassis, CommDish

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
