var Chassis = function(data) {
    Component.call(this, data.name, data.type, data.cost, data.description,
                   data.metrics);

    this.width  = data.width;
    this.height = data.height;
    this.length = data.length;
    this.color = data.color;

    var geometry = new THREE.BoxGeometry(this.width, this.height, this.length);
    var material = new THREE.MeshLambertMaterial({ color: this.color });
    var mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
};

Chassis.prototype = Object.create(Component.prototype);
Chassis.prototype.constructor = Chassis;
