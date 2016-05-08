var View = function(name) {
    this.name = name;

    this.scene = new Scene("");
    this.menuPane = new MenuPane();
    this.statusPane = new Pane();
};

View.prototype.render = function(renderer) {
    this.scene.render(renderer);
};

View.prototype.step = function() { 
    this.scene.step();
};

View.prototype.getMenuElement = function() {
    return this.menuPane.generateElement();
};

View.prototype.getStatusElement = function() {
    return this.statusPane.generateElement();
};
