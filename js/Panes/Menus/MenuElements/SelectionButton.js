var SelectionButton = function(swapFunction, options) {
    this.swapFunction = swapFunction;
    this.options = options;
    this.selected = options[0];
};

SelectionButton.prototype.generateElement = function() {
    var html = "";
    html += "<button type=\"button\" class=\"btn btn-default full-btn\" "+
            "onclick=\""+this.onclickName+"\">"+this.label+"</button>\n";
    return html;
};
