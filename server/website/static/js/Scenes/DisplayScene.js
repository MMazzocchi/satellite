var DisplayScene = function(satellite) {
    Scene.call(this, "Display Scene");

    this.camera = new THREE.OrthographicCamera(-800, 800, 800, -800, 1, 10000);

    this.camera.position.z = 1000;
    this.camera.position.y = 1000;
    this.camera.rotation.x -= Math.PI*0.25;

    var amLight = new THREE.AmbientLight("#FFFFFF", 0.5);
    this.scene.add(amLight);

    var light = new THREE.PointLight("#FFFFFF", 2);
    light.position.y = 1000;
    this.scene.add(light);

    if(satellite == undefined) {
        satellite = new THREE.Object3D();
    }
    this.satellite = satellite;    
    this.scene.add(satellite);
};

DisplayScene.prototype = Object.create(Scene.prototype);
DisplayScene.prototype.constructor = DisplayScene;

DisplayScene.prototype.step = function() {
    this.satellite.rotation.y += 0.03;
};
