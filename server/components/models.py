from django.db import models

class ComponentType(models.Model):
    name = models.CharField(max_length=50)
    display_name = models.CharField(max_length=50)
    model_name = models.CharField(max_length=50)
    total = models.SmallIntegerField(default=0)

    def __str__(self):
        return self.display_name

class Component(models.Model):
    name = models.CharField(max_length=50)
    cost = models.SmallIntegerField(default=0)
    description = models.TextField(default="No description")
    weight = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)

    class Meta:
        abstract = True

class Chassis(Component):
    color = models.CharField(max_length=7)
    width = models.SmallIntegerField()
    length = models.SmallIntegerField()
    height = models.SmallIntegerField()
    durability = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)

    def __str__(self):
        return self.name+" Chassis"

class CommDish(Component):
    dish_color = models.CharField(max_length=7)
    bulb_color = models.CharField(max_length=7)
    dish_width = models.SmallIntegerField()
    signal_range = models.DecimalField(max_digits=2, decimal_places=1, default=2.5)

    def __str__(self):
        return self.name+" Comm Dish"

class Batteries(Component):
    color = models.CharField(max_length=7)
    width = models.SmallIntegerField()
    life = models.DecimalField(max_digits=2, decimal_places=1, default=2.5)

    def __str__(self):
        return self.name+" Batteries"

class SolarPanels(Component):
    color = models.CharField(max_length=7)
    width = models.SmallIntegerField()
    height = models.SmallIntegerField()
    strength = models.DecimalField(max_digits=2, decimal_places=1, default=2.5)

    def __str__(self):
        return self.name+" Solar Panels"

class Storage(Component):
    base_color = models.CharField(max_length=7)
    disk_color = models.CharField(max_length=7)
    width = models.SmallIntegerField()
    space = models.DecimalField(max_digits=2, decimal_places=1, default=2.5)

    def __str__(self):
        return self.name

class Sensors(Component):
    base_color = models.CharField(max_length=7)
    dome_color = models.CharField(max_length=7)
    width = models.SmallIntegerField()
    strength = models.DecimalField(max_digits=2, decimal_places=1, default=2.5)

    def __str__(self):
        return self.name

class Processor(Component):
    color = models.CharField(max_length=7)
    width = models.SmallIntegerField()
    height = models.SmallIntegerField()
    speed = models.DecimalField(max_digits=2, decimal_places=1, default=2.5)

    def __str__(self):
        return self.name + " Processor"

class FuelTank(Component):
    tank_color = models.CharField(max_length=7)
    tube_color = models.CharField(max_length=7)
    radius = models.SmallIntegerField()
    length = models.SmallIntegerField()
    space = models.DecimalField(max_digits=2, decimal_places=1, default=2.5)

    def __str__(self):
        return self.name + " Fuel Tank"

class Thrusters(Component):
    color = models.CharField(max_length=7)
    height = models.SmallIntegerField()
    power = models.DecimalField(max_digits=2, decimal_places=1, default=2.5)
    efficiency = models.DecimalField(max_digits=2, decimal_places=1, default=2.5)

    def __str__(self):
        return self.name + " Thrusters"
