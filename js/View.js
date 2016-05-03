var View = function(name) {
    this.name = name;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10000);
};

View.prototype.render = function(renderer) {
    renderer.render(this.scene, this.camera);
};

View.prototype.step = function() { console.log("View step."); };
