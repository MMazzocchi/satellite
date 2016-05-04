var Satellite = function() {
    THREE.Object3D.call(this);

    // No need to do any replacing; the chassis is always the center.
    this.chassis = new Chassis();
    this.add(this.chassis);

    this.commDish = new CommDish();
    this.replaceCommDish(this.commDish);

    this.batteries = new Batteries();
    this.replaceBatteries(this.batteries);

    this.hardDrive = new HardDrive();
    this.replaceHardDrive(this.hardDrive);

    this.fuelTank = new FuelTank();
    this.replaceFuelTank(this.fuelTank);

    this.processor = new Processor();
    this.replaceProcessor(this.processor);

    this.solarPanels = new SolarPanels();
    this.replaceSolarPanels(this.solarPanels);

    this.thrusters = undefined;
};

Satellite.prototype = Object.create(THREE.Object3D.prototype);
Satellite.prototype.constructor = Satellite;

Satellite.prototype.replaceChassis = function(newChassis) {
    // The chassis will be the center of the satellite.
    if(this.chassis != undefined) {
        this.remove(this.chassis);
    }
    this.chassis = newChassis;
    this.add(newChassis);
    if(this.commDish) { this.replaceCommDish(this.commDish); }
};

Satellite.prototype.replaceCommDish = function(newCommDish) {
    // Comm Dish will be on the front of the chassis.
    if(this.commDish != undefined) {
        this.remove(this.commDish);
    }
    this.commDish = newCommDish;
    this.commDish.position.z = this.chassis.length/2  +
                               this.commDish.length/2 + 1;
    this.add(newCommDish);
};

Satellite.prototype.replaceBatteries = function(newBatteries) {
    // Batteries will be in front left corner of the chassis.
    if(this.batteries != undefined) {
        this.remove(this.batteries);
    }
    this.batteries = newBatteries;
    this.batteries.position.y += this.chassis.height/2   + 
                                 this.batteries.height/2 + 1;
    this.batteries.position.x += this.batteries.width/2;
    this.batteries.position.z += this.batteries.length/2;
    this.add(newBatteries);
};

Satellite.prototype.replaceHardDrive = function(newHardDrive) {
    // Hard drive will be in front right corner of the chassis.
    if(this.hardDrive != undefined) {
        this.remove(this.hardDrive);
    }
    this.hardDrive = newHardDrive;
    this.hardDrive.position.y += this.chassis.height/2   + 
                                 this.hardDrive.height/2 + 1;
    this.hardDrive.position.x -= this.hardDrive.width/2;
    this.hardDrive.position.z += this.hardDrive.length/2;
    this.add(newHardDrive);
};

Satellite.prototype.replaceFuelTank = function(newFuelTank) {
    // Fuel tank will be on the back of the chassis.
    if(this.fuelTank != undefined) {
        this.remove(this.fuelTank);
    }
    this.fuelTank = newFuelTank;
    this.fuelTank.position.z -= this.chassis.length/2 + 
                                this.fuelTank.length/2;
    this.add(newFuelTank);
};

Satellite.prototype.replaceProcessor = function(newProcessor) {
    // Processor will be in back left corner of the chassis.
    if(this.processor != undefined) {
        this.remove(this.processor);
    }
    this.processor = newProcessor;
    this.processor.position.y += this.chassis.height/2 +
                                 this.processor.height/2;
    this.processor.position.x += this.processor.width/2;
    this.processor.position.z -= this.processor.length/2;
    this.add(newProcessor);
};

Satellite.prototype.replaceSolarPanels = function(newSolarPanels) {
    // SolarPanels will be  on the left and right sides of the chassis.
    if(this.solarPanels != undefined) {
        this.remove(this.solarPanels.getLeftPanel());
        this.remove(this.solarPanels.getRightPanel());
    }

    this.solarPanels = newSolarPanels;
    var leftPanel = newSolarPanels.getLeftPanel();
    leftPanel.position.x += this.chassis.width/2 +
                            leftPanel.width/2;
    this.add(leftPanel);

    var rightPanel = newSolarPanels.getRightPanel();
    rightPanel.position.x -= this.chassis.width/2 +
                            rightPanel.width/2;
    this.add(rightPanel);

};
