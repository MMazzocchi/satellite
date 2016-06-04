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

JobsView.prototype.getJobElement = function(job) {
    var html = "<button type=\"button\" class=\"jobs-btn btn btn-default\"\">";
    html += "<img class=\"icon img-thumbnail\" src=\"";

    if(job.type == 1) {
        html += "{% static 'images/commercial.png' %}\"/>Commercial";
    } else if(job.type == 2) {
        html += "{% static 'images/criminal.png' %}\"/>Criminal";
    } else if(job.type == 3) {
        html += "{% static 'images/government.png' %}\"/>Government";
    } else if(job.type == 4) {
        html += "{% static 'images/non_profit.png' %}\"/>Non-profit";
    } else if(job.type == 5) {
        html += "{% static 'images/science.png' %}\"/>Science";
    }

    html += " job #"+job.id+"</button>\n";

    return html;
};

JobsView.prototype.setupMenu = function() {
    var statusPane = $('#statusPane')[0];
    if(statusPane.scroll) statusPane.scroll(0,0);
    var jobsMenu = $('#jobsMenu')[0];
    var jobsStatus = $('#jobsStatus')[0];

    var html = "";
    var total = 0;
    for(var i in this.jobs) {
        var job = this.jobs[i];
        html += this.getJobElement(job);
    }

    jobsMenu.innerHTML = html;
};
