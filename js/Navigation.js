var Navigation = function() {
    this.homeView = new HomeView();
};

Navigation.prototype.setCurrentView = function(newView) {
    var menuPane = $('#menuPane');
    var children = menuPane.children();

    for(var i = 0; i < children.length; i++) {
        if(children[i].style.display != "none") {
            children[i].style.display = "none";
        }
    }

    var menuId = newView.menuId;
    $('#'+menuId)[0].style.display = "block";

    newView.setupMenu();

    currentView = newView;
};

Navigation.prototype.loadHomeView = function() {
    this.setCurrentView(this.homeView);
};

Navigation.prototype.loadBuildView = function() {
    this.setCurrentView(new BuildView());
};
