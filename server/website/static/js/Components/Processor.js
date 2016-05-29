var Processor = function(data) {
    Component.call(this, data.name, data.type, data.cost, data.description,
                   data.metrics);

    var baseGeom = new THREE.BoxGeometry(data.width, 20, data.width);
    var baseMat = new THREE.MeshLambertMaterial({ color: data.color });

    var base = new THREE.Mesh(baseGeom, baseMat);
    base.position.y -= (data.height/2);
    this.add(base);

    var towerGeom = new THREE.BoxGeometry(data.width-20, data.height,
                                          data.width-20);
    var tower = new THREE.Mesh(towerGeom, baseMat);
    tower.position.y += 10;
    this.add(tower);

    this.length = data.width;
    this.width  = data.width;
    this.height = data.height;
};

Processor.prototype = Object.create(Component.prototype);
Processor.prototype.constructor = Processor;
