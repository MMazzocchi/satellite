var LightChassis = function() {
    Chassis.call(this, "Light", 250, 200, 400, "#5588FF");
};

LightChassis.prototype = Object.create(Chassis.prototype);
LightChassis.prototype.constructor = LightChassis;
