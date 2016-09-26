var Satellite = function(data, callback) {
    THREE.Object3D.call(this);

    var thisSat = this;

    var chassisId, commDishId, batteriesId, solarPanelsId, storageId, sensorsId,
        processorId, fuelTankId, thrustersId;

    if(data == undefined) {
        chassisId     = 1;
        commDishId    = 1;
        batteriesId   = 1;
        solarPanelsId = 1;
        storageId     = 1;
        sensorsId     = 1;
        processorId   = 1;
        fuelTankId    = 1;
        thrustersId   = 1;

        this.name = "";
    } else {
        chassisId     = data.components.chassis;
        commDishId    = data.components.commDish;
        batteriesId   = data.components.batteries;
        solarPanelsId = data.components.solarPanels;
        storageId     = data.components.storage;
        sensorsId     = data.components.sensors;
        processorId   = data.components.processor;
        fuelTankId    = data.components.fuelTank;
        thrustersId   = data.components.thrusters;

        this.name     = data.name;
    }

    this.loaded = 0;
    // This function gets called after each component has loaded. After they've
    // all checked in (and loaded = 9), the finall callback will be called.
    function componentCallback() {
        thisSat.loaded++;
        if(thisSat.loaded == 9) {
            if(callback) { callback(thisSat); }
        }
    }

    // Create a 3D object for the chassis; we'll replace it last.
    this.chassis = new THREE.Object3D();

    cache.getComponentData("commDish", commDishId, function(data) {
        var commDish = new CommDish(data);
        thisSat.replaceCommDish(commDish);
        componentCallback();
    });

    cache.getComponentData("batteries", batteriesId, function(data) {
        var batteries = new Batteries(data);
        thisSat.replaceBatteries(batteries);
        componentCallback();
    });

    cache.getComponentData("solarPanels", solarPanelsId, function(data) {
        var solarPanels = new SolarPanels(data);
        thisSat.replaceSolarPanels(solarPanels);
        componentCallback();
    });

    cache.getComponentData("storage", storageId, function(data) {
        var storage = new Storage(data);
        thisSat.replaceStorage(storage);
        componentCallback();
    });

    cache.getComponentData("sensors", sensorsId, function(data) {
        var sensors = new Sensors(data);
        thisSat.replaceSensors(sensors);
        componentCallback();
    });

    cache.getComponentData("processor", processorId, function(data) {
        var processor = new Processor(data);
        thisSat.replaceProcessor(processor);
        componentCallback();
    });

    cache.getComponentData("fuelTank", fuelTankId, function(data) {
        var fuelTank = new FuelTank(data);
        thisSat.replaceFuelTank(fuelTank);
        componentCallback();
    });

    cache.getComponentData("thrusters", thrustersId, function(data) {
        var thrusters = new Thrusters(data);
        thisSat.replaceThrusters(thrusters);
        componentCallback();
    });

    cache.getComponentData("chassis", chassisId, function(data) {
        thisSat.chassis = new Chassis(data);
        thisSat.replaceChassis(thisSat.chassis);
        componentCallback();
    });
};

Satellite.prototype = Object.create(THREE.Object3D.prototype);
Satellite.prototype.constructor = Satellite;

Satellite.prototype.replaceComponent = function(componentName, newComponent) {
    switch(componentName) {
        case "chassis":
            this.replaceChassis(newComponent);
            break;
        case "commDish":
            this.replaceCommDish(newComponent);
            break;
        case "processor":
            this.replaceProcessor(newComponent);
            break;
        case "thrusters":
            this.replaceThrusters(newComponent);
            break;
        case "storage":
            this.replaceStorage(newComponent);
            break;
        case "batteries":
            this.replaceBatteries(newComponent);
            break;
        case "fuelTank":
            this.replaceFuelTank(newComponent);
            break;
        case "sensors":
            this.replaceSensors(newComponent);
            break;
        case "solarPanels":
            this.replaceSolarPanels(newComponent);
            break;
        default:
            // TODO: Throw an error
            console.error("Could not add compononent.");
    }
};

Satellite.prototype.replaceChassis = function(newChassis) {
    // The chassis will be the center of the satellite.
    if(this.chassis != undefined) {
        this.remove(this.chassis);
    }
    this.chassis = newChassis;
    this.add(newChassis);
    if(this.commDish) {    this.replaceCommDish(this.commDish);       }
    if(this.batteries) {   this.replaceBatteries(this.batteries);     }
    if(this.storage) {     this.replaceStorage(this.storage);         }
    if(this.fuelTank) {    this.replaceFuelTank(this.fuelTank);       }
    if(this.processor) {   this.replaceProcessor(this.processor);     }
    if(this.sensors) {     this.replaceSensors(this.sensors);         }
    if(this.solarPanels) { this.replaceSolarPanels(this.solarPanels); }
    if(this.thrusters) {   this.replaceThrusters(this.thrusters);     }
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

Satellite.prototype.getCost = function() {
    return this.chassis.cost +
           this.commDish.cost +
           this.batteries.cost +
           this.storage.cost +
           this.fuelTank.cost +
           this.processor.cost +
           this.sensors.cost +
           this.solarPanels.cost +
           this.thrusters.cost;
}

Satellite.prototype.getTemplateData = function() {
    var data = {
        // Type data
        chassisType:     this.chassis.type,
        commDishType:    this.commDish.type,
        batteriesType:   this.batteries.type,
        storageType:     this.storage.type,
        fuelTankType:    this.fuelTank.type,
        processorType:   this.processor.type,
        sensorsType:     this.sensors.type,
        solarPanelsType: this.solarPanels.type,
        thrustersType:   this.thrusters.type,

        // Cost data
        chassisCost:     this.chassis.cost,
        commDishCost:    this.commDish.cost,
        batteriesCost:   this.batteries.cost,
        storageCost:     this.storage.cost,
        fuelTankCost:    this.fuelTank.cost,
        processorCost:   this.processor.cost,
        sensorsCost:     this.sensors.cost,
        solarPanelsCost: this.solarPanels.cost,
        thrustersCost:   this.thrusters.cost,

        totalCost:       this.getCost()
    };

    return data;
}
