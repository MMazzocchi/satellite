var TitleScene = function(satellite) {
    Scene.call(this, "Title Scene");

    this.camera.position.z = 1000;

    var light = new THREE.PointLight("#FFFFFF", 1);
    this.scene.add(light);
    var amLight = new THREE.AmbientLight("#FFFFFF", 0.25);
    this.scene.add(amLight);

    var scene = this.scene;

    new THREE.TextureLoader().load("static/images/smallsats.png", function(map) {
        var material = new THREE.SpriteMaterial({map: map, color: "#FFFFFF"});
        var logo = new THREE.Sprite(material);
        logo.scale.set(2*map.image.width, 2*map.image.height);
        scene.add(logo);
    });

    var ballGeom = new THREE.SphereGeometry(20, 20, 20, 0, 2*Math.PI,
                                            0, Math.PI);
    var ballMat = new THREE.MeshLambertMaterial({ color: "#FF0000" });
    this.ball = new THREE.Mesh(ballGeom, ballMat);

    this.ball.angle = 0;
    this.scene.add(this.ball);

};

TitleScene.prototype = Object.create(Scene.prototype);
TitleScene.prototype.constructor = BuildScene;

TitleScene.prototype.step = function() {
    this.ball.angle += 0.07;
    this.ball.position.x = 400*Math.cos(this.ball.angle+0.25*Math.PI);
    this.ball.position.y = 500*Math.sin(this.ball.angle);
    this.ball.position.z = 300*Math.sin(this.ball.angle+0.25*Math.PI);
};
