var FuelTank = function() {
    THREE.Object3D.call(this);
    var points = [];
    
    // Round the end
    var endPoints = 5;
    var radius = 40;
    var theta = 0;
    for(var i = 0; i < endPoints; i++) {
        points.push(new THREE.Vector2(radius*Math.sin(theta),
                                      radius*(1-Math.cos(theta))));
        theta += (0.5*Math.PI)/(endPoints-1);
    }

    var midLength = 150;
    points.push(new THREE.Vector2(radius, radius+midLength));

    for(var i = 0; i < endPoints; i++) {
        theta -= (0.5*Math.PI)/(endPoints-1);
        points.push(new THREE.Vector2(radius*Math.sin(theta),
                                      radius+midLength+(radius*Math.cos(theta))));
    }

    var tankGeom = new THREE.LatheGeometry(points, 20, 0, 2*Math.PI);
    var tankMat  = new THREE.MeshLambertMaterial({ color: "#FFFF00" });
    var tank1    = new THREE.Mesh(tankGeom, tankMat);
    var tank2    = new THREE.Mesh(tankGeom, tankMat);

    tank1.position.x += midLength/2 + radius;
    tank1.rotation.z += Math.PI*0.5;
    tank1.position.y += radius

    tank2.position.x += midLength/2 + radius;
    tank2.rotation.z += Math.PI*0.5;
    tank2.position.y -= radius

    this.add(tank1);
    this.add(tank2);

    this.length = 2*radius;
    this.width  = 2*radius + midLength;
    this.height = 2*radius;
};

FuelTank.prototype = Object.create(THREE.Object3D.prototype);
FuelTank.prototype.constructor = FuelTank;
