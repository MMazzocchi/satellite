var Chassis = function(name, width, height, length, color) {
    this.name = name;
    this.width  = width;
    this.height = height;
    this.length = length;
    this.color = color;

    var geometry = new THREE.BoxGeometry(this.width, this.height, this.length);
    var material = new THREE.MeshLambertMaterial({ color: color });
    THREE.Mesh.call(this, geometry, material);
};

Chassis.prototype = Object.create(THREE.Mesh.prototype);
Chassis.prototype.constructor = Chassis;
