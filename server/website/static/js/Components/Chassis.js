var Chassis = function(data) {
    this.name = data.name;
    this.width  = data.width;
    this.height = data.height;
    this.length = data.length;
    this.color = data.color;

    var geometry = new THREE.BoxGeometry(this.width, this.height, this.length);
    var material = new THREE.MeshLambertMaterial({ color: this.color });
    THREE.Mesh.call(this, geometry, material);
};

Chassis.prototype = Object.create(THREE.Mesh.prototype);
Chassis.prototype.constructor = Chassis;
