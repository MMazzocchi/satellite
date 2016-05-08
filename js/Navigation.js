var Navigation = function() {
    this.homeView = new HomeView();
};

Navigation.prototype.setCurrentView = function(newView) {
    var menuPane = $('#menuPane');
    var statusColumn = $('#statusColumn');

    menuPane.html("");
    statusColumn.html("");

    menuPane.append(newView.getMenuElement());
    statusColumn.append(newView.getStatusElement());

    currentView = newView;
};

Navigation.prototype.loadHomeView = function() {
    this.setCurrentView(this.homeView);
};
