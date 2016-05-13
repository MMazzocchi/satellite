var OrbitScene = function() {
    Scene.call(this, "Orbit Scene");

    this.globe = new Globe();
    this.scene.add(this.globe);

    var ambientLight = new THREE.AmbientLight("#FFFFFF", 0.3);
    this.scene.add(ambientLight);

    var sun = new THREE.DirectionalLight("#FFFFFF", 1.5);
    sun.position.x = 5000;
    sun.position.y = 5000;
    sun.position.z = 3000;
    this.scene.add(sun);

    this.satellite = new Satellite();
    this.satellite.scale.x = 0.001;
    this.satellite.scale.y = 0.001;
    this.satellite.scale.z = 0.001;

    this.satellite.angle = 0;
    this.satellite.position.x = 650;

    this.scene.add(this.satellite);
};

OrbitScene.prototype = Object.create(Scene.prototype);
OrbitScene.prototype.constructor = OrbitScene;

OrbitScene.prototype.step = function() {
    this.globe.rotation.y -= 0.005;

    this.satellite.angle += 0.01;
    this.satellite.position.x = 650*Math.cos(this.satellite.angle);
    this.satellite.position.y = 650*Math.sin(this.satellite.angle);

    var satUp = new THREE.Vector3(Math.sin(this.satellite.angle),
                                  -Math.cos(this.satellite.angle), 0);
    this.satellite.up = satUp;
    this.satellite.lookAt(this.globe.position);

    // The camera should follow the satellite, but behind a bit and off to the
    // side.
    var satAngle = this.satellite.angle;
    var satDist = Math.sqrt((this.satellite.position.y*this.satellite.position.y)+
                            (this.satellite.position.x*this.satellite.position.x));

    var dAngle = 0.002;
    var camAngle = satAngle - dAngle;
    var camDist = satDist * 1.001;

    this.camera.position.x = camDist*Math.cos(camAngle);
    this.camera.position.y = camDist*Math.sin(camAngle);
    this.camera.position.z = this.satellite.position.z + 1.5;

    var camUp = new THREE.Vector3(Math.cos(camAngle), Math.sin(camAngle), 0);
    this.camera.up = camUp;
    this.camera.lookAt(this.satellite.position);
};
