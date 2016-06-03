var Navigation = function() {
    this.homeView = new HomeView();
    this.stockView = new StockView();
};

Navigation.prototype.setCurrentView = function(newView) {

    // Display the correct menu for this view.
    var menuPane = $('#menuPane');
    if(menuPane[0].scroll) menuPane[0].scroll(0,0);
    var menuChildren = menuPane.children();

    for(var i = 0; i < menuChildren.length; i++) {
        if(menuChildren[i].style.display != "none") {
            menuChildren[i].style.display = "none";
        }
    }

    var menuId = newView.menuId;
    $('#'+menuId)[0].style.display = "block";

    newView.setupMenu();

    // Display the correct status for this view.
    var statusPane = $('#statusPane');
    if(statusPane[0].scroll) statusPane[0].scroll(0,0);
    var statusChildren = statusPane.children();

    for(var i = 0; i < statusChildren.length; i++) {
        if(statusChildren[i].style.display != "none") {
            statusChildren[i].style.display = "none";
        }
    }

    var statusId = newView.statusId;
    $('#'+statusId)[0].style.display = "block";

    // Display the new view.
    currentView = newView;
};

Navigation.prototype.loadHomeView = function() {
    this.setCurrentView(this.homeView);
};

Navigation.prototype.loadBuildView = function() {
    this.setCurrentView(new BuildView());
};

Navigation.prototype.loadStockView = function(satellite_id, update) {
    var thisNav = this;

    function gotoStockView() {
        // Display a certain satellite if requested.
        if(satellite_id) {
            thisNav.stockView.satelliteOptions.index = satellite_id - 1;
            thisNav.stockView.showSatellite(satellite_id);
        }
        thisNav.setCurrentView(thisNav.stockView);
    }

    // If an update is needed, reset the stockView satellite options with
    // current user data.
    if(update) {
        cache.getUserData(function(data) {
            thisNav.stockView.satelliteOptions.total = data.satellites;
            gotoStockView();
        });
    } else {
        gotoStockView();
    }
}
