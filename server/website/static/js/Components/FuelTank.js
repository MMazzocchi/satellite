var FuelTank = function(data) {
    Component.call(this, data.name, data.type, data.cost, data.description, 
                   data.metrics);

    var points = [];
    
    // Round the end
    var endPoints = 5;
    var radius = data.radius;
    var theta = 0;
    for(var i = 0; i < endPoints; i++) {
        points.push(new THREE.Vector2(radius*Math.sin(theta),
                                      radius*(1-Math.cos(theta))));
        theta += (0.5*Math.PI)/(endPoints-1);
    }

    var midLength = data.length;
    points.push(new THREE.Vector2(radius, radius+midLength));

    for(var i = 0; i < endPoints; i++) {
        theta -= (0.5*Math.PI)/(endPoints-1);
        points.push(new THREE.Vector2(radius*Math.sin(theta),
                                      radius+midLength+(radius*Math.cos(theta))));
    }

    var tankGeom = new THREE.LatheGeometry(points, 20, 0, 2*Math.PI);
    var tankMat  = new THREE.MeshLambertMaterial({ color: data.tank_color });
    var tank1    = new THREE.Mesh(tankGeom, tankMat);
    var tank2    = new THREE.Mesh(tankGeom, tankMat);

    tank1.position.x += midLength/2 + radius;
    tank1.rotation.z += Math.PI*0.5;
    tank1.position.y += radius

    tank2.position.x += midLength/2 + radius;
    tank2.rotation.z += Math.PI*0.5;
    tank2.position.y -= radius;

    var tubeGeom = new THREE.TorusGeometry(radius, 20, 15, 20, Math.PI);
    var tubeMat  = new THREE.MeshLambertMaterial({ color: data.tube_color });
    var tube     = new THREE.Mesh(tubeGeom, tubeMat);

    tube.position.x -= (radius + midLength)/2;
    tube.rotation.z += Math.PI*0.5;

    this.add(tank1);
    this.add(tank2);
    this.add(tube);

    this.length = 2*radius;
    this.width  = 2*radius + midLength;
    this.height = 2*radius;
};

FuelTank.prototype = Object.create(Component.prototype);
FuelTank.prototype.constructor = FuelTank;
