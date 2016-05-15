var Chassis = function(data) {
    Component.call(this, data.name, data.cost, data.description);

    this.width  = data.width;
    this.height = data.height;
    this.length = data.length;
    this.color = data.color;

    this.metrics['Durability'] = data.durability;
    this.metrics['Weight'] = data.weight;

    var geometry = new THREE.BoxGeometry(this.width, this.height, this.length);
    var material = new THREE.MeshLambertMaterial({ color: this.color });
    var mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
};

Chassis.prototype = Object.create(Component.prototype);
Chassis.prototype.constructor = Chassis;
