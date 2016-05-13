from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Component lookup API
    url(r'^components/', include('components.urls')),

    # Admin site
    url(r'^admin/', admin.site.urls),

    # Fallthrough to the regular site
    url(r'^', include('website.urls'))
]
