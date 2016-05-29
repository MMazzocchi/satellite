var Cache = function() {
    this.components = {};
    this.satellites = {};
};

Cache.prototype.refreshComponent = function(componentName, 
                                            instanceId,
                                            callBack) {

    var url = "/components/"+componentName+"/"+instanceId+"/";
    var thisCache = this;
    $.ajax(url).done(function(response) {
        var data = JSON.parse(response);
        if(data.response.found) {
            thisCache.components[componentName][instanceId] = 
                data.response.data;
            callBack(data.response.data);
        } else {
            // TODO: Throw an error.
        }
    }).fail(function() {
        // TODO: Throw an error.
    });
};

Cache.prototype.getComponentData = function(componentName, instanceId,
                                            callBack) {
    if(this.components[componentName] == undefined) {
        this.components[componentName] = {};
    }

    // If this component hasn't already been created, create it from web data.
    if(this.components[componentName][instanceId] == undefined) {
        this.refreshComponent(componentName, instanceId, callBack);
    } else {
        callBack(this.components[componentName][instanceId]);
    }
};

Cache.prototype.refreshSatellite = function(satelliteId, callBack) {
    var url = "/satellite/"+satelliteId+"/";
    var thisCache = this;

    $.ajax(url).done(function(response) {
        var data = JSON.parse(response);
        if(data.valid) {
            thisCache.satellites[satelliteId] = data;
            callBack(data);
        } else {
            // TODO: Throw an error.
        }
    }).fail(function() {
        // TODO: Throw an error.
    });
};

Cache.prototype.getSatelliteData = function(satelliteId, callBack) {
    if(this.satellites[satelliteId] == undefined) {
        this.refreshSatellite(satelliteId, callBack);
    } else {
        callBack(this.components[satelliteId]);
    }
};


