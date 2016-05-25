var StockView = function() {
    View.call(this);

    this.scene = new DisplayScene();

    this.menuId = "stockMenu";
    this.statusId = "stockStatus";
};

StockView.prototype = Object.create(View.prototype);
StockView.prototype.constructor = StockView;

StockView.prototype.setupMenu = function() {

};
