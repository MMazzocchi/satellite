var CommDish = function() {
    THREE.Object3D.call(this);
    var dishGeom = new THREE.SphereGeometry(300, 20, 5,
                                            0, 2*Math.PI, 
                                            0, 0.2*Math.PI);

    var dishMat = new THREE.MeshLambertMaterial({ color: "#FFFFFF" });
    dishMat.side = THREE.DoubleSide;
    var dish = new THREE.Mesh(dishGeom, dishMat);
    dish.rotation.x -= 0.5*Math.PI;
    this.add(dish);

    var poleGeom = new THREE.CylinderGeometry(15, 15, 150, 10, 1, true,
                                              0, 2*Math.PI);

    var pole = new THREE.Mesh(poleGeom, dishMat);
    pole.position.y += 150+75;
    dish.add(pole);

    var ballGeom = new THREE.SphereGeometry(25, 10, 10, 0, 2*Math.PI,
                                            0, Math.PI);
    var ballMat = new THREE.MeshLambertMaterial({ color: "#FF0000" });
    var ball = new THREE.Mesh(ballGeom, ballMat);
    ball.position.y -= 75;
    pole.add(ball);

    this.length = 300*2;
    this.width  = 300*2;
    this.height = 300*2;
};

CommDish.prototype = Object.create(THREE.Object3D.prototype);
CommDish.prototype.constructor = CommDish;
