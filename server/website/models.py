from django.db import models
from django.contrib.auth.models import User
from components.models import Chassis, CommDish, Batteries, SolarPanels
from components.models import Storage, Sensors, Processor, FuelTank
from components.models import Thrusters

class SiteUser(models.Model):
    user = models.OneToOneField(User)
    money = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.get_username()

class Satellite(models.Model):
    name        = models.CharField(max_length=50)
    owner       = models.ForeignKey(SiteUser,    on_delete=models.CASCADE)

    chassis     = models.ForeignKey(Chassis,     on_delete=models.PROTECT)
    commDish    = models.ForeignKey(CommDish,    on_delete=models.PROTECT)
    batteries   = models.ForeignKey(Batteries,   on_delete=models.PROTECT)
    solarPanels = models.ForeignKey(SolarPanels, on_delete=models.PROTECT)
    storage     = models.ForeignKey(Storage,     on_delete=models.PROTECT)
    sensors     = models.ForeignKey(Sensors,     on_delete=models.PROTECT)
    processor   = models.ForeignKey(Processor,   on_delete=models.PROTECT)
    fuelTank    = models.ForeignKey(FuelTank,    on_delete=models.PROTECT)
    thrusters   = models.ForeignKey(Thrusters,   on_delete=models.PROTECT)

    def __str__(self):
        return self.name

class Job(models.Model):
    user = models.ForeignKey(SiteUser, on_delete=models.CASCADE)

    theta = models.DecimalField(default=0, max_digits=6, decimal_places=5)
    phi   = models.DecimalField(default=0, max_digits=6, decimal_places=5)

    class Statuses:
        NEW         = 1
        EXPIRED     = 2
        REJECTED    = 3
        IN_PROGRESS = 4
        COMPLETE    = 5

        status_choices = (
            (NEW,         "New"),
            (EXPIRED,     "Expired"),
            (REJECTED,    "Rejected"),
            (IN_PROGRESS, "In Progress"),
            (COMPLETE,    "Complete")
        )

        def getStatusStr(choices, type_id):
            for t in choices:
                if type_id in t:
                    return t[1]

            return ""

    class Types:
        COMMERCIAL = 1
        CRIMINAL   = 2
        GOVERNMENT = 3
        NON_PROFIT = 4
        SCIENCE    = 5

        type_choices = (
            (COMMERCIAL, "Commercial"),
            (CRIMINAL,   "Criminal"),
            (GOVERNMENT, "Government"),
            (NON_PROFIT, "Non-Profit"),
            (SCIENCE,    "Science")
        )

        def getTypeStr(choices, type_id):
            for t in choices:
                if type_id in t:
                    return t[1]

            return ""

    type = models.PositiveSmallIntegerField(choices=Types.type_choices)
    status = models.PositiveSmallIntegerField(choices=Statuses.status_choices,
                                              default=Statuses.NEW)
    payment = models.PositiveIntegerField()

    required_space = models.DecimalField(max_digits=2, decimal_places=1,
                                         default=2.5)
    required_speed = models.DecimalField(max_digits=2, decimal_places=1, 
                                         default=2.5)

    def __str__(self):
        return self.user.user.username + " / " + \
               self.Types.getTypeStr(self.Types.type_choices, self.type)
