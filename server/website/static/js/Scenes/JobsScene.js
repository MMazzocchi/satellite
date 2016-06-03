var JobsScene = function() {
    GlobeScene.call(this);
    this.name = "Jobs Scene";

    this.jobs = {};
    this.count = 0;
};

JobsScene.prototype = Object.create(GlobeScene.prototype);
JobsScene.prototype.constructor = JobsScene;

JobsScene.prototype.addJob = function(job) {
    var indGeom = new THREE.SphereGeometry(25, 10, 10,
                                           0, 2*Math.PI, 
                                           0, Math.PI);
    var indMat  = new THREE.MeshLambertMaterial({ color: "#FFFF00" });
    var indicator = new THREE.Mesh(indGeom, indMat);

    var radius = GLOBE_RADIUS + 11;

    indicator.position.x = radius*Math.sin(job.phi)*Math.cos(job.theta);
    indicator.position.y = radius*Math.cos(job.phi);
    indicator.position.z = radius*Math.sin(job.phi)*Math.sin(job.theta);


    this.globe.add(indicator);

    this.jobs[job.id] = {
        indicator: indicator
    };
};

JobsScene.prototype.step = function() {
    this.globe.rotation.y -= 0.03;

    if((this.count % 10) == 0) {
        for(var id in this.jobs) {
            var job = this.jobs[id];
            job.indicator.visible = !job.indicator.visible;
        }
    }
    this.count++;
};
