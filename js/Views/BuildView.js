var BuildView = function() {
    View.call(this);

    this.scene = new BuildScene();

    this.menuId = "buildMenu";
};

BuildView.prototype = Object.create(View.prototype);
BuildView.prototype.constructor = BuildView;
