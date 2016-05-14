from django.db import models

class ComponentType(models.Model):
    name = models.CharField(max_length=50)
    display_name = models.CharField(max_length=50)
    model_name = models.CharField(max_length=50)

    def __str__(self):
        return self.display_name

class Chassis(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=7)
    width = models.SmallIntegerField()
    length = models.SmallIntegerField()
    height = models.SmallIntegerField()
    comp_type = models.ForeignKey(ComponentType, default=1)
    cost = models.SmallIntegerField(default=0)
    description = models.TextField(default="No description")
    durability = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    weight = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)

    def __str__(self):
        return self.name+" Chassis"
