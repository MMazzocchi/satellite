var Processor = function() {
    THREE.Object3D.call(this);
    var baseGeom = new THREE.BoxGeometry(100, 20, 100);
    var baseMat = new THREE.MeshLambertMaterial({ color: "#444444" });

    var base = new THREE.Mesh(baseGeom, baseMat);
    base.position.y -= 30;
    this.add(base);

    var towerGeom = new THREE.BoxGeometry(80, 80, 80);
    var tower = new THREE.Mesh(towerGeom, baseMat);
    this.add(tower);

    this.length = 100;
    this.width  = 100;
    this.height = 80;
};

Processor.prototype = Object.create(THREE.Object3D.prototype);
Processor.prototype.constructor = Processor;
