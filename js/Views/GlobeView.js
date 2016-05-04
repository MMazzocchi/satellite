var GlobeView = function() {
    View.call(this, "Globe View");

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

    var curve = new THREE.EllipseCurve(0, 0, 650, 650, 0, 2*Math.PI, false, 0);
    var path = new THREE.Path(curve.getPoints(50));
    var geom = path.createPointsGeometry(50);
    var material = new THREE.LineBasicMaterial({color:"#FFFF00"});
    var ellipse = new THREE.Line(geom, material);
    this.scene.add(ellipse);
};

GlobeView.prototype = Object.create(View.prototype);
GlobeView.prototype.constructor = GlobeView;

GlobeView.prototype.step = function() {
    this.globe.rotation.y -= 0.03;
};
