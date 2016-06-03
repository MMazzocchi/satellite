var JobsView = function() {
    View.call(this);

    this.scene = new JobsScene();

    this.menuId = "jobsMenu";
    this.statusId = "jobsStatus";

    var thisView = this;
    cache.getJobs(function(data) {
        thisView.jobs = data.jobs;
        for(var i in data.jobs) {
            var job = data.jobs[i];
            thisView.scene.addJob(job);
        }
    });
};

JobsView.prototype = Object.create(View.prototype);
JobsView.prototype.constructor = JobsView;

JobsView.prototype.setupMenu = function() {

};
