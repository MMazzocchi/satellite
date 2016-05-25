var BuildView = function() {
    View.call(this);

    this.scene = new DisplayScene();
    this.menuId = "buildMenu";
    this.statusId = "buildStatus";

    {% for type in component_types %}

    this.{{ type.name }}Options = {
        index: 0,
        total: {{ type.total }}
    };

    {% endfor %}
};

BuildView.prototype = Object.create(View.prototype);
BuildView.prototype.constructor = BuildView;

BuildView.prototype.showTotal = function() {
    var statusPane = $('#statusPane')[0];
    if(statusPane.scroll) statusPane.scroll(0,0);
    var buildStatus = $('#buildStatus')[0];

    var html = "";
    var total = 0;
    html += "<div class=\"container-fluid\">\n";
    html += "  <div class=\"row\"\n>";
    html += "    <div class=\"col-xs-9 table-cell\"><strong>Component</strong></div>\n";
    html += "    <div class=\"col-xs-3 table-cell\"><strong>Cost</strong></div>\n";
    html += "  </div>\n";
    {% for type in component_types %}
    html += "  <div class=\"row\"\n>";
    html += "    <div class=\"col-xs-9 table-cell\">";
    html += this.scene.satellite.{{ type.name }}.name;
    html += "    </div>\n";
    html += "    <div class=\"col-xs-3 table-cell\">";
    html += "      <span class=\"glyphicon glyphicon-minus-sign coin\" "+
            "aria-hidden=\"true\"></span>\n";
    html += this.scene.satellite.{{ type.name }}.cost;
    total += this.scene.satellite.{{ type.name }}.cost;
    html += "    </div>\n";
    html += "  </div>\n";
    {% endfor %}
    html += "  <div class=\"row\"\n>";
    html += "    <div class=\"col-xs-13 divider\"></div>\n";
    html += "  </div>\n";
    html += "  <div class=\"row\"\n>";
    html += "    <div class=\"col-xs-9 table-cell\">\n";
    html += "      <strong>Total:</strong>\n";
    html += "    </div>\n";
    html += "    <div class=\"col-xs-3 table-cell\">"
    html += "      <span class=\"glyphicon glyphicon-minus-sign coin\" "+
            "aria-hidden=\"true\"></span>\n";
    html += total+"</div>\n";
    html += "  </div>\n";
    html += "</div>\n";
 
    buildStatus.innerHTML = html;
}

BuildView.prototype.updateStatusPane = function(component) {
    var statusPane = $('#statusPane')[0];
    if(statusPane.scroll) statusPane.scroll(0,0);
    var buildStatus = $('#buildStatus')[0];

    var html = "";
    html += "<h4>"+component.name+"</h4>";
    html += "<p>"+component.description+"</p>";
    for(var metric in component.metrics) {
        html += "<h5>"+metric+"</h5>";
        html += "<meter min=\"0\" max=\"5\" value=\""+
                component.metrics[metric]+"\" class=\"meter\"></meter>"+
                component.metrics[metric];
    }
    html += "<div class=\"divider\"></div>";
    html += "<button id=\"totalButton\">See Total</button>";

    buildStatus.innerHTML = html;

    var thisView = this;
    $('#totalButton').click(function() {
        thisView.showTotal();
    });
};

BuildView.prototype.setupMenu = function() {
    var thisView = this;

    // Attach events to each component type selector
    {% for type in component_types %}

    $('#{{ type.name }}-right').click(function() {
        thisView.{{ type.name }}Options.index =
            (thisView.{{ type.name }}Options.index + 1) % 
            thisView.{{ type.name }}Options.total;

        function callBack(data) {
            var newComponent = new {{ type.model_name }}(data);
            thisView.scene.satellite.replaceComponent("{{ type.name }}",
                                                      newComponent);
            thisView.updateStatusPane(newComponent);
        }

        cache.getInstanceData("{{ type.name }}", 
                              thisView.{{ type.name }}Options.index + 1,
                              callBack);
    });

    $('#{{ type.name }}-left').click(function() {
        thisView.{{ type.name }}Options.index =
            (thisView.{{ type.name }}Options.index + 
             thisView.{{ type.name }}Options.total - 1) % 
            thisView.{{ type.name }}Options.total;

        function callBack(data) {
            var newComponent = new {{ type.model_name }}(data);
            thisView.scene.satellite.replaceComponent("{{ type.name }}", 
                                                      newComponent);
            thisView.updateStatusPane(newComponent);
        }

        cache.getInstanceData("{{ type.name }}", 
                              thisView.{{ type.name }}Options.index + 1,
                              callBack);
    });
    {% endfor %}
};
