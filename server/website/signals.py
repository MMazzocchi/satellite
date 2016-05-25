from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from .models import SiteUser

def mirror_user_callback(sender, **kwargs):
    if kwargs['instance'].siteuser == None:
        # Create a site user for this user.
        siteUser = SiteUser(user=kwargs['instance'])
        siteUser.save()

post_save.connect(mirror_user_callback, sender=User,
                  dispatch_uid="ready_function")
