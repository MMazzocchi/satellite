var StockView = function() {
    View.call(this);

    this.scene = new DisplayScene();

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
