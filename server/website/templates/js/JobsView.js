{% load staticfiles %}

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
    var statusPane = $('#statusPane')[0];
    if(statusPane.scroll) statusPane.scroll(0,0);
    var jobsMenu = $('#jobsMenu')[0];
    var jobsStatus = $('#jobsStatus')[0];

    // Fill the jobs menu with items created from the template
    $("#jobsMenu").loadTemplate(
      "{% static 'jquery_templates/job_menu_item.html' %}",
      this.jobs);
};
