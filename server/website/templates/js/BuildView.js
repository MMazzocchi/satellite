var BuildView = function() {
    View.call(this);

    this.scene = new BuildScene();
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

BuildView.prototype.updateStatusPane = function(component) {
    var statusPane = $('#statusPane')[0];
    statusPane.scroll(0,0);
    var buildStatus = $('#buildStatus')[0];

    var html = "";
    html += "<h4>"+component.name+"</h4>";
    html += "<p>"+component.description+"</p>";
    buildStatus.innerHTML = html;
};

BuildView.prototype.setupMenu = function() {
    var thisView = this;

    // Attach events to each component type selector
    {% for type in component_types %}

    $('#{{ type.name }}-right').click(function() {
        thisView.{{ type.name }}Options.index =
            (thisView.{{ type.name }}Options.index + 1) % 
            thisView.{{ type.name }}Options.total;

        function callBack(data) {
            var newComponent = new {{ type.model_name }}(data);
            thisView.scene.satellite.replace{{ type.model_name }}(newComponent);
            thisView.updateStatusPane(newComponent);
        }

        cache.getInstanceData("{{ type.name }}", 
                              thisView.{{ type.name }}Options.index + 1,
                              callBack);
    });

    $('#{{ type.name }}-left').click(function() {
        thisView.{{ type.name }}Options.index =
            (thisView.{{ type.name }}Options.index + 
             thisView.{{ type.name }}Options.total - 1) % 
            thisView.{{ type.name }}Options.total;

        function callBack(data) {
            {% if type.name == "chassis" %}
            var newComponent = new Chassis(data);
            {% endif %}
            thisView.scene.satellite.replaceChassis(newComponent);
            thisView.updateStatusPane(newComponent);
        }

        cache.getInstanceData("{{ type.name }}", 
                              thisView.{{ type.name }}Options.index + 1,
                              callBack);
    });
    {% endfor %}
};
