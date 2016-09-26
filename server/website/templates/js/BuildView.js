{% load staticfiles %}

var BuildView = function() {
    View.call(this);

    this.scene = new DisplayScene(new Satellite());
    this.menuId = "buildMenu";
    this.statusId = "buildStatus";

    {% for type in component_types %}

    this.{{ type.name }}Options = {
        index: 0,
        total: {{ type.total }}
    };

    {% endfor %}
};

BuildView.prototype = Object.create(View.prototype);
BuildView.prototype.constructor = BuildView;

BuildView.prototype.showError = function(error) {
    $('#error-msg')[0].innerHTML = error;
    $('#error-box')[0].hidden = false;
};

BuildView.prototype.purchase = function() {
    var thisView = this;

    var total = this.scene.satellite.getCost();

    var name = $('#new_name')[0].value;
    if(name.length == 0) {
        thisView.showError("Please enter a name for your satellite.");
    } else {

        cache.getUserData(function(user) {

            if(total > user.money) {
                thisView.showError(
                    "You cannot afford this satellite! Try choosing less " +
                    "expensive components, or make some more money on the " +
                    "jobs screen.");
            } else {

                // Construct the object we're sending to the server.
                var settings = {
                    method: 'POST',
                    data: {
                        name: $('#new_name')[0].value,
                        {% for type in component_types %}
                        {{ type.name }}: thisView.scene.satellite
                                         .{{ type.name }}.component_id,
                        {% endfor %}
                        csrfmiddlewaretoken: 
                            $('input[name=csrfmiddlewaretoken]')[0].value
                    }
                };

                // Send the data off.
                var url = "purchase/";
                $.ajax(url, settings).done(function(response) {
                    var data = JSON.parse(response);

                    if(data.valid) {
                        $('#error-box')[0].hidden = true;
                        cache.refreshUser(function() {
                            navigation.loadStockView(data.id, true);
                        });
                    } else {
                        thisView.showError(data.error);
                    }

                }).fail(function() {
                    // TODO: Make this a more descriptive error message based on the
                    // server response.
                    thisView.showError(
                        "The server couldn't be reached. Refresh the page " +
                        "and check your internet connection.\n");
                });
            }
        });
    }
};

BuildView.prototype.showTotal = function() {
    var statusPane = $('#statusPane')[0];
    if(statusPane.scroll) statusPane.scroll(0,0);

    var thisView = this;

    // Create the table from a jQuery template
    $("#buildStatus").loadTemplate(
        "template/build_component_table.html",

        this.scene.satellite.getTemplateData(),

        // On complete, assign the purchase button a function
        { "complete": function() {
            $('#purchaseButton').click(function() {
                thisView.purchase();
            });
        }
    });
}

BuildView.prototype.updateStatusPane = function(component) {
    var statusPane = $('#statusPane')[0];
    if(statusPane.scroll) statusPane.scroll(0,0);

    var html = "";
    for(var metric in component.metrics) {
        html += "<h5>"+metric+"</h5>";
        html += "<meter min=\"0\" max=\"5\" value=\""+
                component.metrics[metric]+"\" class=\"meter\"></meter>"+
                component.metrics[metric];
    }

    var thisView = this;

    $('#buildStatus').loadTemplate(
        "{% static 'jquery_templates/component_status.html' %}",

        component,

        // On complete, assign the purchase button a function
        { "complete": function() {
            $('#metricList')[0].innerHTML = html;
            $('#totalButton').click(function() {
                thisView.showTotal();
            });
        }
    });

};

BuildView.prototype.setupMenu = function() {
    var thisView = this;

    // Attach events to each component type selector
    {% for type in component_types %}

    $('#{{ type.name }}-right').unbind("click");
    $('#{{ type.name }}-left').unbind("click");

    $('#{{ type.name }}-right').click(function() {
        thisView.{{ type.name }}Options.index =
            (thisView.{{ type.name }}Options.index + 1) % 
            thisView.{{ type.name }}Options.total;

        function callBack(data) {
            var newComponent = new {{ type.model_name }}(data);
            thisView.scene.satellite.replaceComponent("{{ type.name }}",
                                                      newComponent);
            thisView.updateStatusPane(newComponent);
        }

        cache.getComponentData("{{ type.name }}", 
                               thisView.{{ type.name }}Options.index + 1,
                               callBack);
    });

    $('#{{ type.name }}-left').click(function() {
        thisView.{{ type.name }}Options.index =
            (thisView.{{ type.name }}Options.index + 
             thisView.{{ type.name }}Options.total - 1) % 
            thisView.{{ type.name }}Options.total;

        function callBack(data) {
            var newComponent = new {{ type.model_name }}(data);
            thisView.scene.satellite.replaceComponent("{{ type.name }}", 
                                                      newComponent);
            thisView.updateStatusPane(newComponent);
        }

        cache.getComponentData("{{ type.name }}", 
                               thisView.{{ type.name }}Options.index + 1,
                               callBack);
    });
    {% endfor %}
};
