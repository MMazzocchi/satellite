var Chassis = function() {
    this.width  = 400;
    this.height = 400;
    this.length = 400;

    var geometry = new THREE.BoxGeometry(this.width, this.height, this.length);
    var material = new THREE.MeshLambertMaterial({ color: "#555555" });
    THREE.Mesh.call(this, geometry, material);
};

Chassis.prototype = Object.create(THREE.Mesh.prototype);
Chassis.prototype.constructor = Chassis;
