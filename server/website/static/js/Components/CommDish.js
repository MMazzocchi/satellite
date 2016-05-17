var CommDish = function(data) {
    Component.call(this, data.name, data.cost, data.description, data.metrics);

    var dishGeom = new THREE.SphereGeometry(data.dish_width, 20, 5,
                                            0, 2*Math.PI, 
                                            0, 0.2*Math.PI);

    var dishMat = new THREE.MeshLambertMaterial({ color: data.dish_color });
    dishMat.side = THREE.DoubleSide;
    var dish = new THREE.Mesh(dishGeom, dishMat);
    dish.rotation.x -= 0.5*Math.PI;
    this.add(dish);

    var poleGeom = new THREE.CylinderGeometry(15, 15, 150, 10, 1, true,
                                              0, 2*Math.PI);

    var pole = new THREE.Mesh(poleGeom, dishMat);
    pole.position.y += (data.dish_width/2)+75;
    dish.add(pole);

    var ballGeom = new THREE.SphereGeometry(25, 10, 10, 0, 2*Math.PI,
                                            0, Math.PI);
    var ballMat = new THREE.MeshLambertMaterial({ color: data.bulb_color });
    var ball = new THREE.Mesh(ballGeom, ballMat);
    ball.position.y -= 75;
    pole.add(ball);

    this.length = data.dish_width*2;
    this.width  = data.dish_width*2;
    this.height = data.dish_width*2;
};

CommDish.prototype = Object.create(Component.prototype);
CommDish.prototype.constructor = CommDish;
