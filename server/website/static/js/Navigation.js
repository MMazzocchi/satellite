var Navigation = function() {
    this.homeView = new HomeView();
};

Navigation.prototype.setCurrentView = function(newView) {

    // Display the correct menu for this view.
    var menuPane = $('#menuPane');
    menuPane[0].scroll(0,0);
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
    statusPane[0].scroll(0,0);
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
