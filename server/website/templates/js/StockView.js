{% load staticfiles %}

var StockView = function() {
    View.call(this);

    // Initialize with an empty object; we'll replace it in the callback.
    this.scene = new DisplayScene(new THREE.Object3D());

    this.menuId = "stockMenu";
    this.statusId = "stockStatus";

    this.satellite = undefined;
};

StockView.prototype = Object.create(View.prototype);
StockView.prototype.constructor = StockView;

StockView.prototype.updateStatusPane = function() {
    var statusPane = $('#statusPane')[0];
    if(statusPane.scroll) statusPane.scroll(0,0);

    // Create the table from a jQuery template
    $("#stockStatus").loadTemplate(
      "{% static 'jquery_templates/stock_component_table.html' %}",
      this.satellite.getTemplateData());
};

StockView.prototype.showSatellite = function(data) {

    var thisView = this;

    new Satellite(data, function(satellite) {
        thisView.scene.replaceSatellite(satellite);
        thisView.satellite = satellite;
        thisView.updateStatusPane();
    });
};

StockView.prototype.setupMenu = function() {
    var thisView = this;

    // Create a callback function to pass to the selector.
    function callback(data) {
        thisView.showSatellite(data);
    }

    SatelliteSelector.instatiate(callback);
};
