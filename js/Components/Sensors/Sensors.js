var Sensors = function() {
    THREE.Object3D.call(this);
    var baseGeom = new THREE.BoxGeometry(120, 20, 120);
    var baseMat = new THREE.MeshLambertMaterial({ color: "#00FFFF" });

    var base = new THREE.Mesh(baseGeom, baseMat);
    base.position.y -= 25;
    this.add(base);

    var domeGeom = new THREE.SphereGeometry(50, 20, 20,
                                            0, 2*Math.PI, 
                                            0, 0.5*Math.PI);
    var domeMat = new THREE.MeshPhongMaterial({ color: "#FFFFFF" });
    domeMat.transparent = true;
    domeMat.opacity = 0.8;
    var dome = new THREE.Mesh(domeGeom, domeMat);
    dome.position.y -= 15;
    this.add(dome);

    this.length = 120;
    this.width  = 120;
    this.height = 70;
};

Sensors.prototype = Object.create(THREE.Object3D.prototype);
Sensors.prototype.constructor = Sensors;
