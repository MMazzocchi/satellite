from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Component lookup API
    url(r'^components/', include('components.urls')),

    # Admin site
    url(r'^admin/', admin.site.urls),

    # Authentication stuff
    url(r'^auth/', include('authentication.urls')),

    # Fallthrough to the regular site
    url(r'^', include('website.urls'))
]
