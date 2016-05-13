var Scene = function(name) {
    this.name = name;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10000);
};

Scene.prototype.render = function(renderer) {
    renderer.render(this.scene, this.camera);
};

Scene.prototype.step = function() { console.log("Scene step."); };
