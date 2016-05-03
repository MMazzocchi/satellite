var Satellite = function() {
    THREE.Object3D.call(this);

    this.chassis = new Chassis();
    this.add(this.chassis);

    this.solarPanels = undefined;

    // Comm Dish will be on the front of the chassis.
    this.commDish = new CommDish();
    this.commDish.position.z += this.chassis.length/2  + 
                                this.commDish.length/2 + 1;
    this.add(this.commDish);

    this.thrusters = undefined;

    // Batteries will be in front left corner of the chassis.
    this.batteries = new Batteries();
    this.batteries.position.y += this.chassis.height/2   + 
                                 this.batteries.height/2 + 1;
    this.batteries.position.x += this.batteries.width/2;
    this.batteries.position.z += this.batteries.length/2;
    this.add(this.batteries);
};

Satellite.prototype = Object.create(THREE.Object3D.prototype);
Satellite.prototype.constructor = Satellite;

Satellite.prototype.replaceChassis = function(newChassis) {
    this.remove(this.chassis);
    this.chassis = newChassis;
    this.add(newChassis);
    this.commDish.position.z = this.chassis.length/2  +
                               this.commDish.length/2 + 1;
};

Satellite.prototype.replaceCommDish = function(newCommDish) {
    this.remove(this.commDish);
    this.ccommDish = newCommDish;
    this.commDish.position.z = this.chassis.length/2  +
                               this.commDish.length/2 + 1;
    this.add(newCommDish);
};

Satellite.prototype.replaceBatteries = function(newBatteries) {
    this.remove(this.batteries);
    this.batteries = newBatteries;
    this.batteries.position.y += this.chassis.height/2   + 
                                 this.batteries.height/2 + 1;
    this.batteries.position.x += this.batteries.width/2;
    this.batteries.position.z += this.batteries.length/2;
    this.add(newBatteries);
};


