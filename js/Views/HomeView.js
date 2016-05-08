var HomeView = function() {
    View.call(this);

    this.scene = new TitleScene();
    this.menuPane = new HomeMenu();
};

HomeView.prototype = Object.create(View.prototype);
HomeView.prototype.constructor = HomeView;
