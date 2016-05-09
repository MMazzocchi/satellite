var HardDrive = function() {
    THREE.Object3D.call(this);
    var baseGeom = new THREE.BoxGeometry(100, 20, 100);
    var baseMat = new THREE.MeshLambertMaterial({ color: "#444444" });

    this.base = new THREE.Mesh(baseGeom, baseMat);
    this.add(this.base);

    var diskGeom = new THREE.RingGeometry(10, 50, 15, 1, 0, 2*Math.PI);
    var diskMat = new THREE.MeshPhongMaterial({ color: "#999999" });
    var disk = new THREE.Mesh(diskGeom, diskMat);
    disk.rotation.x -= 0.5*Math.PI;
    disk.position.y += 11;
    this.add(disk);

    this.length = 100;
    this.width  = 100;
    this.height = 20;
};

HardDrive.prototype = Object.create(THREE.Object3D.prototype);
HardDrive.prototype.constructor = HardDrive;
