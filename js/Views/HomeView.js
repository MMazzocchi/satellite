var HomeView = function() {
    View.call(this);

    this.scene = new TitleScene();
};

HomeView.prototype = Object.create(View.prototype);
HomeView.prototype.constructor = HomeView;
