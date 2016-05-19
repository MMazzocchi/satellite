var Sensors = function(data) {
    Component.call(this, data.name, data.cost, data.description, data.metrics);

    var baseGeom = new THREE.BoxGeometry(data.width, 20, data.width);
    var baseMat = new THREE.MeshLambertMaterial({ color: data.base_color });

    var base = new THREE.Mesh(baseGeom, baseMat);
    base.position.y -= 25;
    this.add(base);

    var domeGeom = new THREE.SphereGeometry((data.width/2)-10, 20, 20,
                                            0, 2*Math.PI, 
                                            0, 0.5*Math.PI);
    var domeMat = new THREE.MeshPhongMaterial({ color: data.dome_color });
    domeMat.transparent = true;
    domeMat.opacity = 0.8;
    var dome = new THREE.Mesh(domeGeom, domeMat);
    dome.position.y -= 15;
    this.add(dome);

    this.length = data.width;
    this.width  = data.width;
    this.height = 70;
};

Sensors.prototype = Object.create(THREE.Object3D.prototype);
Sensors.prototype.constructor = Sensors;
