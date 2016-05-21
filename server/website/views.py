from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import ListView
from django.db.models import Count
from django.contrib.auth.mixins import LoginRequiredMixin

from components.models import ComponentType

class IndexView(LoginRequiredMixin, ListView):
    template_name = "html/index.html"
    context_object_name = 'component_types'
    
    def get_queryset(self):
        return ComponentType.objects.all()

class BuildView(ListView):
    template_name = "js/BuildView.js"
    context_object_name = 'component_types'

    def get_queryset(self):
        return ComponentType.objects.all()
