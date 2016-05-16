var Satellite = function() {
    THREE.Object3D.call(this);

    var thisSat = this;

    // Create a 3D object for the chassis; we'll replace it last.
    this.chassis = new THREE.Object3D();

    cache.getInstanceData("commDish", 1, function(data) {
        thisSat.commDish = new CommDish(data);
        thisSat.replaceCommDish(thisSat.commDish);
    });

    this.batteries = new Batteries();
    this.replaceBatteries(this.batteries);

    this.storage = new Storage();
    this.replaceStorage(this.storage);

    this.fuelTank = new FuelTank();
    this.replaceFuelTank(this.fuelTank);

    this.processor = new Processor();
    this.replaceProcessor(this.processor);

    this.sensors = new Sensors();
    this.replaceSensors(this.sensors);

    this.solarPanels = new SolarPanels();
    this.replaceSolarPanels(this.solarPanels);

    this.thrusters = new Thrusters();
    this.replaceThrusters(this.thrusters);

    cache.getInstanceData("chassis", 1, function(data) {
        thisSat.chassis = new Chassis(data);
        thisSat.replaceChassis(thisSat.chassis);
    });
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
    if(this.commDish) {           this.replaceCommDish(this.commDish);       }
    if(this.replaceBatteries) {   this.replaceBatteries(this.batteries);     }
    if(this.replaceStorage) {   this.replaceStorage(this.storage);     }
    if(this.replaceFuelTank) {    this.replaceFuelTank(this.fuelTank);       }
    if(this.replaceProcessor) {   this.replaceProcessor(this.processor);     }
    if(this.replaceSensors) {     this.replaceSensors(this.sensors);         }
    if(this.replaceSolarPanels) { this.replaceSolarPanels(this.solarPanels); }
    if(this.replaceThrusters) {   this.replaceThrusters(this.thrusters);     }
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
    this.batteries.position.y = this.chassis.height/2   + 
                                this.batteries.height/2 + 1;
    this.batteries.position.x = this.batteries.width/2;
    this.batteries.position.z = this.batteries.length/2;
    this.add(newBatteries);
};

Satellite.prototype.replaceStorage = function(newStorage) {
    // storage will be in front right corner of the chassis.
    if(this.storage != undefined) {
        this.remove(this.storage);
    }
    this.storage = newStorage;
    this.storage.position.y =  this.chassis.height/2   + 
                                 this.storage.height/2 + 1;
    this.storage.position.x = -this.storage.width/2;
    this.storage.position.z =  this.storage.length/2;
    this.add(newStorage);
};

Satellite.prototype.replaceFuelTank = function(newFuelTank) {
    // Fuel tank will be on the back of the chassis.
    if(this.fuelTank != undefined) {
        this.remove(this.fuelTank);
    }
    this.fuelTank = newFuelTank;
    this.fuelTank.position.z = -this.chassis.length/2 - 
                                this.fuelTank.length/2;
    this.add(newFuelTank);
};

Satellite.prototype.replaceProcessor = function(newProcessor) {
    // Processor will be in back left corner of the chassis.
    if(this.processor != undefined) {
        this.remove(this.processor);
    }
    this.processor = newProcessor;
    this.processor.position.y =  this.chassis.height/2 +
                                 this.processor.height/2;
    this.processor.position.x =  this.processor.width/2;
    this.processor.position.z = -this.processor.length/2;
    this.add(newProcessor);
};

Satellite.prototype.replaceSensors = function(newSensors) {
    // Sensors will be in back right corner of the chassis.
    if(this.sensors != undefined) {
        this.remove(this.sensors);
    }
    this.sensors = newSensors;
    this.sensors.position.y =  this.chassis.height/2 +
                               this.sensors.height/2;
    this.sensors.position.x = -this.sensors.width/2;
    this.sensors.position.z = -this.sensors.length/2;
    this.add(newSensors);
};

Satellite.prototype.replaceSolarPanels = function(newSolarPanels) {
    // SolarPanels will be  on the left and right sides of the chassis.
    if(this.solarPanels != undefined) {
        this.remove(this.solarPanels.getLeftPanel());
        this.remove(this.solarPanels.getRightPanel());
    }

    this.solarPanels = newSolarPanels;
    var leftPanel = newSolarPanels.getLeftPanel();
    leftPanel.position.x = this.chassis.width/2 +
                           leftPanel.width/2;
    this.add(leftPanel);

    var rightPanel = newSolarPanels.getRightPanel();
    rightPanel.position.x = -this.chassis.width/2 -
                             rightPanel.width/2;
    this.add(rightPanel);
};

Satellite.prototype.replaceThrusters = function(newThrusters) {
    // Thrusters will be  on the left and right sides of the chassis.
    // Each side's array will be arranged like this:
    //     0 => front, top
    //     1 => back,  top
    //     2 => back,  bottom
    //     3 => front, bottom
    if(this.thrusters != undefined) {
        var leftThrusters  = this.thrusters.getLeftThrusters();
        var rightThrusters = this.thrusters.getRightThrusters();
        for(var i = 0; i < 4; i++) {
            this.remove(leftThrusters[i]);
            this.remove(rightThrusters[i]);
        }
    }

    this.thrusters = newThrusters;
    var leftThrusters  = newThrusters.getLeftThrusters();
    var rightThrusters = newThrusters.getRightThrusters();

    for(var side = -1; side <= 1; side += 2) {
        var currentThrusters = leftThrusters;
        if(side == 1) {
            currentThrusters = rightThrusters;
        }

        var thruster0 = currentThrusters[0];
        thruster0.position.x = (this.chassis.width/2 + thruster0.width/2)*
                               side;
        thruster0.position.z = this.chassis.length/2 - thruster0.length/2;
        thruster0.position.y = this.chassis.height/2 - thruster0.height/2;
        this.add(thruster0);
    
        var thruster1 = currentThrusters[1];
        thruster1.position.x =  (this.chassis.width/2 + thruster1.width/2)*
                                side;
        thruster1.position.z = -this.chassis.length/2 + thruster1.length/2;
        thruster1.position.y =  this.chassis.height/2 - thruster1.height/2;
        this.add(thruster1);
    
        var thruster2 = currentThrusters[2];
        thruster2.position.x =  (this.chassis.width/2 + thruster2.width/2)*
                                side;
        thruster2.position.z = -this.chassis.length/2 + thruster2.length/2;
        thruster2.position.y = -this.chassis.height/2 + thruster2.height/2;
        this.add(thruster2);
    
        var thruster3 = currentThrusters[3];
        thruster3.position.x =  (this.chassis.width/2 + thruster3.width/2)*
                                side;
        thruster3.position.z =  this.chassis.length/2 - thruster3.length/2;
        thruster3.position.y = -this.chassis.height/2 + thruster3.height/2;
        this.add(thruster3);
    }
};
