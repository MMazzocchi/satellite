var Satellite = function() {
    THREE.Object3D.call(this);

    // The chassis will be the center of the satellite.
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

    // Hard drive will be in front right corner of the chassis.
    this.hardDrive = new HardDrive();
    this.hardDrive.position.y += this.chassis.height/2   + 
                                 this.hardDrive.height/2 + 1;
    this.hardDrive.position.x -= this.hardDrive.width/2;
    this.hardDrive.position.z += this.hardDrive.length/2;
    this.add(this.hardDrive);

    // Fuel tank will be on the back of the chassis.
    this.fuelTank = new FuelTank();
    this.fuelTank.position.z -= this.chassis.length/2 + 
                                this.fuelTank.length/2;
    this.add(this.fuelTank);

    this.processor = undefined;
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
    this.commDish = newCommDish;
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

Satellite.prototype.replaceHardDrive = function(newHardDrive) {
    this.remove(this.hardDrive);
    this.hardDrive = newHardDrive;
    this.hardDrive.position.y += this.chassis.height/2   + 
                                 this.hardDrive.height/2 + 1;
    this.hardDrive.position.x -= this.hardDrive.width/2;
    this.hardDrive.position.z += this.hardDrive.length/2;
    this.add(newHardDrive);
};

Satellite.prototype.replaceFuelTank = function(newFuelTank) {
    this.remove(this.fuelTank);
    this.fuelTank = newFuelTank;
    this.fuelTank.position.z -= this.chassis.length/2 + 
                                this.fuelTank.length/2;
    this.add(newFuelTank);
};


