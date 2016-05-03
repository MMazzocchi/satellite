var CommDish = function() {
    THREE.Object3D.call(this);
    var dishGeom = new THREE.SphereGeometry(300, 20, 5,
                                            0, 2*Math.PI, 
                                            0, 0.2*Math.PI);

    var dishMat = new THREE.MeshPhongMaterial({ color: "#FFFFFF" });
    dishMat.side = THREE.DoubleSide;
    var dish = new THREE.Mesh(dishGeom, dishMat);
    dish.rotation.x -= Math.PI/2;
    this.add(dish);

    this.length = 300*2;
    this.width  = 300*2;
    this.height = 300*2;
};

CommDish.prototype = Object.create(THREE.Object3D.prototype);
CommDish.prototype.constructor = CommDish;
