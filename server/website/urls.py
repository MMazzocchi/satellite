from django.conf.urls import url

from . import views
from .views import BuildView
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^$', views.index_view, name='index'),
    url(r'^js/BuildView.js$', BuildView.as_view(), name='build_view'),
    url(r'^js/StockView.js$', views.stock_view, name='stock_view'),
    url(r'^satellite/(?P<num>[0-9]+)/?$', views.satellite_view, name='satellite_view'),
    url(r'^purchase/?$', views.purchase_view, name='purchase_view'),
    url(r'^user/?$', views.user_view, name='user_view'),
]
