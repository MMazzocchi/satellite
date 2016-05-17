var Batteries = function(data) {
    Component.call(this, data.name, data.cost, data.description, data.metrics);

    var batteryGeom = new THREE.CylinderGeometry(data.width/2, data.width/2, 
                                                 60, 10, 1, false,
                                                 0, 2*Math.PI);

    var batteryMat = new THREE.MeshLambertMaterial({ color: data.color });
    for(var x = -1; x <= 1; x++) {
        for(var z = -1; z <= 1; z++) {
            var battery = new THREE.Mesh(batteryGeom, batteryMat);
            battery.position.x += x*data.width;
            battery.position.z += z*data.width;
            this.add(battery);
        }
    }

    this.length = 3*data.width;
    this.width  = 3*data.width;
    this.height = 60;
};

Batteries.prototype = Object.create(Component.prototype);
Batteries.prototype.constructor = Batteries;
