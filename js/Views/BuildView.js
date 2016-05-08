var BuildView = function() {
    View.call(this);

    this.scene = new BuildScene();
};

BuildView.prototype = Object.create(View.prototype);
BuildView.prototype.constructor = BuildView;
