var HomeView = function() {
    View.call(this);

    this.scene = new TitleScene();

    this.menuId = "homeMenu";
    this.statusId = "homeStatus";
};

HomeView.prototype = Object.create(View.prototype);
HomeView.prototype.constructor = HomeView;

HomeView.prototype.setupMenu = function() {
    // Clear any already bound click functions.
    $('.home-link').off("click");
    $('.build-link').off("click");
    $('.stock-link').off("click");
    $('.jobs-link').off("click");

    $('.home-link').click(function() { navigation.loadHomeView() });
    $('.build-link').click(function() { navigation.loadBuildView() });
    $('.stock-link').click(function() { navigation.loadStockView() });
    $('.jobs-link').click(function() { navigation.loadJobsView() });
};
