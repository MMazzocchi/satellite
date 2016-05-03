var Batteries = function() {
    THREE.Object3D.call(this);
    var batteryGeom = new THREE.CylinderGeometry(20, 20, 60, 10, 1, false,
                                                 0, 2*Math.PI);

    var batteryMat = new THREE.MeshLambertMaterial({ color: "#00FF00" });
    for(var x = -1; x <= 1; x++) {
        for(var z = -1; z <= 1; z++) {
            var battery = new THREE.Mesh(batteryGeom, batteryMat);
            battery.position.x += x*40;
            battery.position.z += z*40;
            this.add(battery);
        }
    }

    this.length = 120;
    this.width  = 120;
    this.height = 60;
};

Batteries.prototype = Object.create(THREE.Object3D.prototype);
Batteries.prototype.constructor = Batteries;
