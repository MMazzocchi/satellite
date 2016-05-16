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
 
]
