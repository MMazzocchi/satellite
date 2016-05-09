var StandardChassis = function() {
    Chassis.call(this, "Standard", 400, 400, 400, "#555555");
};

StandardChassis.prototype = Object.create(Chassis.prototype);
StandardChassis.prototype.constructor = StandardChassis;
