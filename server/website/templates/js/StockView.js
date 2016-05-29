var StockView = function() {
    View.call(this);

    // Initialize with an empty object; we'll replace it in the callback.
    this.scene = new DisplayScene(new THREE.Object3D());

    this.menuId = "stockMenu";
    this.statusId = "stockStatus";

    this.satelliteOptions = {
        index: 0,
        total: {{ total_satellites }}
    };

    this.satellite = undefined;

    if(this.satelliteOptions.total > 0) {
        // Show the user's first satellite.
        this.showSatellite(1);
    }
};

StockView.prototype = Object.create(View.prototype);
StockView.prototype.constructor = StockView;

StockView.prototype.updateStatusPane = function() {
    $('#satelliteName')[0].innerHTML = this.satellite.name;
    $('#noSatHelpText')[0].innerHTML = "";

    var statusPane = $('#statusPane')[0];
    if(statusPane.scroll) statusPane.scroll(0,0);
    var stockStatus = $('#stockStatus')[0];

    if(this.satellite != undefined) {
        var html = "";
        html += "<div class=\"container-fluid\">\n";
        html += "  <div class=\"row\"\n>";
        html += "    <div class=\"col-xs-6 table-cell\"><strong>Component</strong></div>\n";
        html += "    <div class=\"col-xs-6 table-cell\"><strong>Type</strong></div>\n";
        html += "  </div>\n";
        {% for type in component_types %}
        html += "  <div class=\"row\"\n>";
        html += "    <div class=\"col-xs-6 table-cell\">";
        html += "{{ type.name }}";
        html += "    </div>\n";
        html += "    <div class=\"col-xs-6 table-cell\">";
        html += this.satellite.{{ type.name }}.name;
        html += "    </div>\n";
        html += "  </div>\n";
        {% endfor %}
        html += "  <div class=\"row\"\n>";
        html += "    <div class=\"col-xs-13 divider\"></div>\n";
        html += "  </div>\n";
        html += "</div>\n";
    }
    stockStatus.innerHTML = html;
};

StockView.prototype.showSatellite = function(satelliteId) {
    var thisView = this;

    function callBack(data) {
        new Satellite(data, function (newSatellite) {
            thisView.scene.replaceSatellite(newSatellite);
            thisView.satellite = newSatellite;
            thisView.updateStatusPane();
        });
    }

    cache.getSatelliteData(this.satelliteOptions.index + 1,
                           callBack);
};

StockView.prototype.setupMenu = function() {
    var thisView = this;
    $('#satellite-right').click(function() {
        if(thisView.satelliteOptions.total > 0) {
            thisView.satelliteOptions.index =
                (thisView.satelliteOptions.index + 1) % 
                thisView.satelliteOptions.total;

            thisView.showSatellite(thisView.satelliteOptions.index);
        }
    });
    $('#satellite-left').click(function() {
        if(thisView.satelliteOptions.total > 0) {
            thisView.satelliteOptions.index =
                (thisView.satelliteOptions.total - 1) % 
                thisView.satelliteOptions.total;

            thisView.showSatellite(thisView.satelliteOptions.index);
        }
    });
};
