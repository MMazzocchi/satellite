from django.conf.urls import url
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='html/login.html')),
    url(r'^verify/?$', views.verification, name="verification"),
    url(r'^logout/?$', views.logout_view, name="logout")
]
