var Chassis = function() {
    var geometry = new THREE.BoxGeometry(400, 400, 400);
    var material = new THREE.MeshLambertMaterial({ color: "#555555" });
    THREE.Mesh.call(this, geometry, material);

    this.width  = 400;
    this.height = 400;
    this.length = 400;
};

Chassis.prototype = Object.create(THREE.Mesh.prototype);
Chassis.prototype.constructor = Chassis;
