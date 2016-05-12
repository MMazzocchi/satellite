from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Chassis

def index(request):
    return HttpResponse("Hello, welcome to the index.")

def instance_data(request, component_name, instance_id):
    response_template = loader.get_template('components/instance_data.json')

    context = {
        'component_name': component_name,
        'instance_id': instance_id,
        'instance_data': None
    }

    if component_name == "chassis":
        data = None
   
        # Try to get the chassis with the given id 
        try:
            chassis = Chassis.objects.get(pk=instance_id)

            # Render the specific chassis data, which will be passed into the
            # components template.
            chassis_template = loader.get_template('components/chassis.json')
            chassis_ctx = {
                'name': chassis.name,
                'color': chassis.color,
                'width': chassis.width,
                'length': chassis.length,
                'height': chassis.height
            }

            data = chassis_template.render(chassis_ctx, request)
        except Chassis.DoesNotExist:
            data = None
    
        context['instance_data'] = data

    return render(request, 'components/instance_data.json', context)
