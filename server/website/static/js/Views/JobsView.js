var JobsView = function() {
    View.call(this);

    this.scene = new GlobeScene();

    this.menuId = "jobsMenu";
    this.statusId = "jobsStatus";
};

JobsView.prototype = Object.create(View.prototype);
JobsView.prototype.constructor = JobsView;

JobsView.prototype.setupMenu = function() {

};
