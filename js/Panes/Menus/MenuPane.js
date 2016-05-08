var MenuPane = function() {
    Pane.call(this);

    this.menuItems = [];

};

MenuPane.prototype = Object.create(Pane.prototype);
MenuPane.prototype.constructor = MenuPane;

MenuPane.prototype.generateElement = function() {
    var html = "";
    html += "<div class=\"dropdown\">\n";
    html +=   "<button class=\"btn btn-default dropdown-toggle\" "+
              "type=\"button\" data-toggle=\"dropdown\" "+
              "aria-haspopup=\"true\" aria-expanded=\"true\" "+
              "id=\"mainMenuDropdown\">\n";
    html +=     "<span class=\"glyphicon glyphicon-menu-hamburger\" "+
                "aria-hidden=\"true\"></span>\n";
    html +=   "</button>\n";
    html +=   "<ul class=\"dropdown-menu\" aria-labelledby=\"mainMenuDropdown\">\n";
    html +=     "<li><a href\"#\">Home</a></li>\n";
    html +=     "<li><a href\"#\">Status</a></li>\n";
    html +=     "<li><a href\"#\">Jobs</a></li>\n";
    html +=     "<li><a href\"#\">Purchase</a></li>\n";
    html +=   "</ul>\n";
    html += "</div>\n";
    html += "<div class=\"divider\"></div>\n";
    return html;
};
