var BuildView = function() {
    View.call(this);

    this.scene = new DisplayScene();
    this.menuId = "buildMenu";

    // TODO: This has GOT to change. Just a prototype now.
    this.chassisOptions = [];
    this.chassisOptions.push(new StandardChassis());
    this.chassisOptions.push(new LightChassis());
    this.chassisOptions.push(new HeavyChassis());
    this.chassisIndex = 0;
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

    $('#chassis-right').click(function() {
        thisView.chassisIndex = (thisView.chassisIndex + 1) % 
                            thisView.chassisOptions.length;

        thisView.scene.satellite.replaceChassis(
          thisView.chassisOptions[thisView.chassisIndex]);
    });

    $('#chassis-left').click(function() {
        thisView.chassisIndex =
          (thisView.chassisIndex + thisView.chassisOptions.length - 1) % 
          thisView.chassisOptions.length;

        thisView.scene.satellite.replaceChassis(
          thisView.chassisOptions[thisView.chassisIndex]);
    });

};
