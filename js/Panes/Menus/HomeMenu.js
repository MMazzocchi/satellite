var HomeMenu = function() {
    MenuPane.call(this);

    this.menuItems.push(new MenuButton("Test", "console.log('Hello!');"));
};

HomeMenu.prototype = Object.create(MenuPane.prototype);
HomeMenu.prototype.constructor = HomeMenu;
