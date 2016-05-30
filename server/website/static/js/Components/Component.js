/**
 * A component represents a piece of the satellite. It is both a three.js
 * object, and a container for other data.
 */
var Component = function(data) {
    THREE.Object3D.call(this);
    this.name = data.name;
    this.type = data.type;
    this.cost = data.cost;
    this.description = data.description;
    this.metrics = data.metrics;
    this.component_id = data.component_id;
};

Component.prototype = Object.create(THREE.Object3D.prototype);
Component.prototype.constructor = Component;
