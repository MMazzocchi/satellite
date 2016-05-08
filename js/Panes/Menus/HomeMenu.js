var HomeMenu = function() {
    MenuPane.call(this);

    this.menuItems.push(new MenuButton("Home", "navigation.loadHomeView()"));
    this.menuItems.push(new MenuButton("Build", "navigation.loadBuildView()"));
};

HomeMenu.prototype = Object.create(MenuPane.prototype);
HomeMenu.prototype.constructor = HomeMenu;
