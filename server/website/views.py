from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import ListView

from components.models import ComponentType

class IndexView(ListView):
    template_name = "index.html"
    context_object_name = 'component_types'
    
    def get_queryset(self):
        return ComponentType.objects.all()
