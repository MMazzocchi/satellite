var MenuPane = function() {
    Pane.call(this);

    this.menuItems = [];

};

MenuPane.prototype = Object.create(Pane.prototype);
MenuPane.prototype.constructor = MenuPane;

MenuPane.prototype.generateElement = function() {
    var html = "";
    return html;
};
