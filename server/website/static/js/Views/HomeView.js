var HomeView = function() {
    View.call(this);

    this.scene = new TitleScene();

    this.menuId = "homeMenu";
};

HomeView.prototype = Object.create(View.prototype);
HomeView.prototype.constructor = HomeView;

HomeView.prototype.setupMenu = function() {
    // Clear any already bound click functions.
    $('.home-link').off("click");
    $('.build-link').off("click");

    $('.home-link').click(function() { navigation.loadHomeView() });
    $('.build-link').click(function() { navigation.loadBuildView() });
};
