var MenuPane = function() {
    Pane.call(this);

    this.menuItems = [];
};

MenuPane.prototype = Object.create(Pane.prototype);
MenuPane.prototype.constructor = MenuPane;

MenuPane.prototype.generateElement = function() {
    var html = "";
    html += "<div class=\"btn-group-vertical btn-group-justified\" role=\"group\" "+
            "aria-label=\"...\">\n";
    for(var i in this.menuItems) {
        html += this.menuItems[i].generateElement();
    }
    html += "</div>\n";
    return html;
};
