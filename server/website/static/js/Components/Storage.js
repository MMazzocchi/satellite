var Storage = function(data) {
    Component.call(this, data.name, data.type, data.cost, data.description,
                   data.metrics);

    var baseGeom = new THREE.BoxGeometry(data.width, 20, data.width);
    var baseMat = new THREE.MeshLambertMaterial({ color: data.base_color });

    this.base = new THREE.Mesh(baseGeom, baseMat);
    this.add(this.base);

    var diskGeom = new THREE.RingGeometry(data.width/10, data.width/2,
                                          15, 1, 0, 2*Math.PI);
    var diskMat = new THREE.MeshPhongMaterial({ color: data.disk_color });
    var disk = new THREE.Mesh(diskGeom, diskMat);
    disk.rotation.x -= 0.5*Math.PI;
    disk.position.y += 11;
    this.add(disk);

    this.length = data.width;
    this.width  = data.width;
    this.height = 20;
};

Storage.prototype = Object.create(THREE.Object3D.prototype);
Storage.prototype.constructor = Storage;
