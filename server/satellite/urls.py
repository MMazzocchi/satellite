from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^components/', include('components.urls')),
    url(r'^admin/', admin.site.urls),
]
