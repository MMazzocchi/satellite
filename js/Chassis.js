var Chassis = function() {
    var geometry = new THREE.BoxGeometry(500, 500, 500);
    var material = new THREE.MeshLambertMaterial({ color: "#555555" });
    THREE.Mesh.call(this, geometry, material);

    this.width  = 500;
    this.height = 500;
    this.length = 500;
};

Chassis.prototype = Object.create(THREE.Mesh.prototype);
Chassis.prototype.constructor = Chassis;
