from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
#    url(r'^(?P<component_name>[a-z_]+)/(?P<instance_id>[0-9]+)/$',
#        views.instance_data, name='instance_index'),
    url(r'^chassis/(?P<pk>[0-9]+)/$', views.ChassisView.as_view(),
        name="chassis")
]
