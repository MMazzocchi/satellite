var View = function(name) {
    this.name = name;

    this.scene = new Scene("");
};

View.prototype.render = function(renderer) {
    this.scene.render(renderer);
};

View.prototype.step = function() { 
    this.scene.step();
};

View.prototype.setupMenu = function() {};
