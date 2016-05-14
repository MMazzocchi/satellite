var ComponentCache = function() {
    this.components = {};
};

ComponentCache.prototype.refreshComponent = function(componentName, 
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

ComponentCache.prototype.getInstanceData = function(componentName, instanceId,
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
