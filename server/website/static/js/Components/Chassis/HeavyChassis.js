var HeavyChassis = function() {
    Chassis.call(this, "Heavy", 500, 500, 500, "#222222");
};

HeavyChassis.prototype = Object.create(Chassis.prototype);
HeavyChassis.prototype.constructor = HeavyChassis;
