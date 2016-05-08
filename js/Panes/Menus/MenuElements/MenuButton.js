var MenuButton = function(label, onclickName) {
    this.label = label;
    this.onclickName = onclickName;
};

MenuButton.prototype.generateElement = function() {
    var html = "";
    html += "<div class=\"btn-group\" role=\"group\">\n";
    html += "<button type=\"button\" class=\"btn btn-default\" onclick=\""+
            this.onclickName+"\">"+this.label+"</button>\n";
    html += "</div>\n";
    return html;
};
