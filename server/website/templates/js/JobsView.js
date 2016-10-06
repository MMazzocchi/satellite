{% load staticfiles %}

var JobsView = function() {
    View.call(this);

    this.scene = new JobsScene();

    this.menuId = "jobsMenu";
    this.statusId = "jobsStatus";

    this.jobs = {};
    this.jobList = [];
    this.currentJob = undefined;

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

JobsView.prototype.selectNewSatellite = function(data) {
    var speedMeter = $('#speedMeter');
    var spaceMeter = $('#spaceMeter');

    var jobSpeed = this.currentJob.speed;
    var jobSpace = this.currentJob.space;

    var processorId = data.components.processor;
    var storageId = data.components.storage;

    new Satellite(data, function(newSat) {
        var satSpeed = newSat.processor.metrics.Speed;
        var satSpace = newSat.storage.metrics.Space;

        // Speed meter
        var red = speedMeter.children(".meter-fill-red")[0];
        var blue = speedMeter.children(".meter-fill-blue")[0];
        var green = speedMeter.children(".meter-fill-green")[0];

        var icon = "";

        if(satSpeed < jobSpeed) {
            blue.width.baseVal.value = satSpeed;
            icon = "<span class=\"glyphicon glyphicon-remove\" "+
                   "aria-hidden=\"true\"></span>";
        } else {
            blue.width.baseVal.value = jobSpeed;
            green.width.baseVal.value = satSpeed;

            icon = "<span class=\"glyphicon glyphicon-ok\" "+
                   "aria-hidden=\"true\"></span>";
        }

        $('#speedMeasure')[0].innerHTML = satSpeed + " / " + jobSpeed + " " +
                                          icon;

        // Space meter
        var red = spaceMeter.children(".meter-fill-red")[0];
        var blue = spaceMeter.children(".meter-fill-blue")[0];
        var green = spaceMeter.children(".meter-fill-green")[0];

        var icon = "";

        if(satSpace < jobSpace) {
            blue.width.baseVal.value = satSpace;

            icon = "<span class=\"glyphicon glyphicon-remove\" "+
                   "aria-hidden=\"true\"></span>";
        } else {
            blue.width.baseVal.value = jobSpace;
            green.width.baseVal.value = satSpace;

            icon = "<span class=\"glyphicon glyphicon-ok\" "+
                   "aria-hidden=\"true\"></span>";
        }

        $('#spaceMeasure')[0].innerHTML = satSpace + " / " + jobSpace + " " + 
                                          icon;
    });
};

JobsView.prototype.setupMenu = function() {
    var statusPane = $('#statusPane')[0];
    if(statusPane.scroll) statusPane.scroll(0,0);

    var thisView = this;

    // Fill the jobs menu with items created from the template
    $("#jobsMenu").loadTemplate(
        "{% static 'jquery_templates/job_menu_item.html' %}",

        this.jobList,

        // After we've instatiated the jobs list, attach an event to each
        // button.
        { "complete": function() {
            $('.jobs-btn').click(function(e) {

                // On click, get the id, and load a template for this job.
                var id = e.currentTarget.children[2].innerHTML;
                thisView.scene.selectJob(id);

                thisView.currentJob = thisView.jobs[id];
                $("#jobsStatus").loadTemplate(
                    "template/job_status.html",

                    thisView.currentJob,

                    { "complete": function() {
                        SatelliteSelector.instatiate(function(data) {
                            thisView.selectNewSatellite(data);
                        });
                    }});
            });
        }}
    );
};
