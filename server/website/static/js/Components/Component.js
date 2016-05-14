/**
 * A component represents a piece of the satellite. It is both a three.js
 * object, and a container for other data.
 */
var Component = function(name, cost, description) {
    THREE.Object3D.call(this);
    this.name = name;
    this.cost = cost;
    this.description = description;
};

Component.prototype = Object.create(THREE.Object3D.prototype);
Component.prototype.constructor = Component;
