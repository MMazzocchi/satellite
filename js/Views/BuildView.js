var BuildView = function() {
    View.call(this);

    this.scene = new BuildScene();

    this.menuId = "buildMenu";
};

BuildView.prototype = Object.create(View.prototype);
BuildView.prototype.constructor = BuildView;

BuildView.prototype.setupMenu = function() {
    // Adjust the height of the build menu, forcing it to scroll
    var buildMenu = $('#buildMenu')[0];
    var navBar = $('#navHeader')[0];
    var height = window.innerHeight - navBar.offsetHeight;

    buildMenu.style.height = height + "px";
};
