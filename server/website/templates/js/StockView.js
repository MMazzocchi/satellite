var StockView = function() {
    View.call(this);

    // Initialize with an empty object; we'll replace it in the callback.
    this.scene = new DisplayScene(new THREE.Object3D());

    var thisView = this;
    cache.getSatelliteData(1, function(data) {
        thisView.satellite = new Satellite(data);
        thisView.scene.replaceSatellite(thisView.satellite);
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

StockView.prototype.showSatellite = function(satelliteId) {
    var thisView = this;

    function callBack(data) {
        var newSatellite = new Satellite(data);
        thisView.scene.replaceSatellite(newSatellite);
        thisView.satellite = newSatellite;
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
