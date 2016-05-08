var BuildMenu = function() {
    MenuPane.call(this);

//    this.menuItems.push(new MenuButton("Build", "navigation.loadBuildView()"));
};

BuildMenu.prototype = Object.create(MenuPane.prototype);
BuildMenu.prototype.constructor = BuildMenu;
