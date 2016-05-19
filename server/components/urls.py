from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^chassis/(?P<pk>[0-9]+)/$', views.ChassisView.as_view(),
        name="chassis"),
    url(r'^commDish/(?P<pk>[0-9]+)/$', views.CommDishView.as_view(),
        name="commDish"),
    url(r'^batteries/(?P<pk>[0-9]+)/$', views.BatteriesView.as_view(),
        name="batteries"),
     url(r'^solarPanels/(?P<pk>[0-9]+)/$', views.SolarPanelsView.as_view(),
        name="solarPanels"),
      url(r'^storage/(?P<pk>[0-9]+)/$', views.StorageView.as_view(),
        name="storage"),
       url(r'^sensors/(?P<pk>[0-9]+)/$', views.SensorsView.as_view(),
        name="sensors"),
 
]
