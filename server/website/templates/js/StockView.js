{% load staticfiles %}

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

    // Create the table from a jQuery template
    $("#stockStatus").loadTemplate(
      "{% static 'jquery_templates/stock_component_table.html' %}",
      this.satellite.getTemplateData());
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
    $('#satellite-right').unbind("click");
    $('#satellite-left').unbind("click");

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
                (thisView.satelliteOptions.index +
                 (thisView.satelliteOptions.total - 1)) % 
                thisView.satelliteOptions.total;
            thisView.showSatellite(thisView.satelliteOptions.index);
        }
    });
};
