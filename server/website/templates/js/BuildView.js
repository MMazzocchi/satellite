var BuildView = function() {
    View.call(this);

    this.scene = new BuildScene();
    this.menuId = "buildMenu";

    {% for type in component_types %}

    this.{{ type.name }}Options = {
        index: 0,
        total: {{ type.total }}
    };

    {% endfor %}
};

BuildView.prototype = Object.create(View.prototype);
BuildView.prototype.constructor = BuildView;

BuildView.prototype.setupMenu = function() {
    // Adjust the height of the build menu, forcing it to scroll
    var buildMenu = $('#buildMenu')[0];
    var navBar = $('#navHeader')[0];
    var height = window.innerHeight - navBar.offsetHeight;
    buildMenu.style.height = height + "px";

    var thisView = this;

    // Attach events to each component type selector
    {% for type in component_types %}

    $('#{{ type.name }}-right').click(function() {
        thisView.{{ type.name }}Options.index =
            (thisView.{{ type.name }}Options.index + 1) % 
            thisView.{{ type.name }}Options.total;

        function callBack(data) {
            {% if type.name == "chassis" %}
            var newComponent = new Chassis(data);
            {% endif %}
            thisView.scene.satellite.replaceChassis(newComponent);
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
        }

        cache.getInstanceData("{{ type.name }}", 
                              thisView.{{ type.name }}Options.index + 1,
                              callBack);
    });
    {% endfor %}
};
