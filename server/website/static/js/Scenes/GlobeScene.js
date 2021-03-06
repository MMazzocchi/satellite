var GlobeScene = function() {
    Scene.call(this, "Globe Scene");

    this.camera = new THREE.OrthographicCamera(-700, 700, 700, -700, 1, 10000);
    this.camera.position.z = 1000;

    this.globe = new Globe();
    this.scene.add(this.globe);

    var ambientLight = new THREE.AmbientLight("#FFFFFF", 0.3);
    this.scene.add(ambientLight);

    var sun = new THREE.PointLight("#FFFFFF", 1.5);
    sun.position.x = 5000;
    sun.position.y = 5000;
    sun.position.z = 3000;
    this.scene.add(sun);
};

GlobeScene.prototype = Object.create(Scene.prototype);
GlobeScene.prototype.constructor = GlobeScene;

GlobeScene.prototype.step = function() {
    this.globe.rotation.y -= 0.03;
};
