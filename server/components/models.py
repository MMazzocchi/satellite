from django.db import models

class ComponentType(models.Model):
    name = models.CharField(max_length=50)
    display_name = models.CharField(max_length=50)

class Chassis(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=7)
    width = models.SmallIntegerField()
    length = models.SmallIntegerField()
    height = models.SmallIntegerField()

    def __str__(self):
        return self.name+" Chassis"
