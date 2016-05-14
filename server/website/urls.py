from django.conf.urls import url

from .views import IndexView, BuildView

urlpatterns = [
    url(r'^$', IndexView.as_view(), name='index'),
    url(r'^js/BuildView.js$', BuildView.as_view(), name='build_view')
]
