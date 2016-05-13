var BlankScene = function(satellite) {
    Scene.call(this, "Blank Scene");
};

BlankScene.prototype = Object.create(Scene.prototype);
BlankScene.prototype.constructor = BuildScene;

BlankScene.prototype.step = function() {};
