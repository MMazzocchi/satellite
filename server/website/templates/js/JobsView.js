{% load staticfiles %}

var JobsView = function() {
    View.call(this);

    this.scene = new JobsScene();

    this.menuId = "jobsMenu";
    this.statusId = "jobsStatus";

    this.jobs = {};
    this.jobList = [];

    var thisView = this;
    cache.getJobs(function(data) {
        for(var i in data.jobs) {
            var job = data.jobs[i];

            thisView.scene.addJob(job);
            thisView.jobs[job.id] = job;
            thisView.jobList.push(job);
        }
    });
};

JobsView.prototype = Object.create(View.prototype);
JobsView.prototype.constructor = JobsView;

JobsView.prototype.setupMenu = function() {
    var statusPane = $('#statusPane')[0];
    if(statusPane.scroll) statusPane.scroll(0,0);

    var thisView = this;

    // Fill the jobs menu with items created from the template
    $("#jobsMenu").loadTemplate(
        "{% static 'jquery_templates/job_menu_item.html' %}",

        this.jobList,

        { "complete": function() {
            $('.jobs-btn').click(function(e) {
                var id = e.currentTarget.children[2].innerHTML;
                thisView.scene.selectJob(id);
            });
        }}
    );
};
