var BuildView = function(satellite) {
    View.call(this, "Build View");

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
        satellite = new Satellite();
    }
    this.satellite = satellite;    
    this.scene.add(satellite);
};

BuildView.prototype = Object.create(View.prototype);
BuildView.prototype.constructor = BuildView;

BuildView.prototype.step = function() {
    this.satellite.rotation.y += 0.03;
};
