var Thruster = function(data, flip) {
    THREE.Object3D.call(this);

    var rodGeom = new THREE.BoxGeometry(50, 30, 30);
    var rodMat  = new THREE.MeshLambertMaterial({ color: "#444444" });
    var rod     = new THREE.Mesh(rodGeom, rodMat);
    rod.position.x += 16;
    this.add(rod);

    var coneGeom = new THREE.CylinderGeometry(20, 32, 75, 4, 1, false,
                                              0, 2*Math.PI);
    var coneMat  = new THREE.MeshLambertMaterial({ color: data.color });
    var cone     = new THREE.Mesh(coneGeom, coneMat);
    cone.position.x -= 11;
    this.add(cone);

    if(flip) {
        this.rotation.y += Math.PI;
    }

    this.length = 64;
    this.width  = 82;
    this.height = data.height;
};

Thruster.prototype = Object.create(THREE.Object3D.prototype);
Thruster.prototype.constructor = Thruster;

var Thrusters = function(data) {
    Component.call(this, data.name, data.cost, data.description, data.metrics);

    this.leftThrusters = [];
    this.rightThrusters = [];

    for(var i = 0; i < 4; i++) {
        this.rightThrusters.push(new Thruster(data, true));
        this.leftThrusters.push(new Thruster(data, false));
    }
};

Thrusters.prototype = Object.create(Component.prototype);
Thrusters.prototype.constructor = Thrusters;

Thrusters.prototype.getLeftThrusters = function() {
    return this.leftThrusters;
};

Thrusters.prototype.getRightThrusters = function() {
    return this.rightThrusters;
};
