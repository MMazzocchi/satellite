var StockView = function() {
    View.call(this);

    // Initialize with an empty object; we'll replace it in the callback.
    this.scene = new DisplayScene(new THREE.Object3D());

    var thisView = this;
    cache.getSatelliteData(1, function(data) {
        var satellite = new Satellite(data);
        thisView.scene.replaceSatellite(satellite);
    });

    this.menuId = "stockMenu";
    this.statusId = "stockStatus";

    this.satelliteOptions = {
        index: 0,
        total: {{ totalSatellites }}
    };
};

StockView.prototype = Object.create(View.prototype);
StockView.prototype.constructor = StockView;

StockView.prototype.setupMenu = function() {
    $('#satellite-left').click(function() {

    });
    $('#satellite-right').click(function() {

    });
};
