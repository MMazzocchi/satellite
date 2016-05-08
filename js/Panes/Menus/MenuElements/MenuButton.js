var MenuButton = function(label, onclickName) {
    this.label = label;
    this.onclickName = onclickName;
};

MenuButton.prototype.generateElement = function() {
    var html = "";
    html += "<button type=\"button\" class=\"btn btn-default full-btn\" "+
            "onclick=\""+this.onclickName+"\">"+this.label+"</button>\n";
    return html;
};
