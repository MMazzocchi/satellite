var Satellite = function() {
    THREE.Object3D.call(this);

    // TODO: These should be like, real things.
    this.chassis = new Chassis();
    this.add(this.chassis);

    this.solarPanels = undefined;

    this.commDish = new CommDish();
    this.commDish.position.z += this.chassis.length/2  + 
                                this.commDish.length/2 + 1;
    this.add(this.commDish);

    this.thrusters = undefined;
};

Satellite.prototype = Object.create(THREE.Object3D.prototype);
Satellite.prototype.constructor = Satellite;

Satellite.prototype.replaceChassis = function(newChassis) {
    this.remove(this.chassis);
    this.chassis = newChassis;
    this.add(newChassis);
};

Satellite.prototype.replaceCommDish = function(newCommDish) {
    this.remove(this.commDish);
    this.ccommDish = newCommDish;
    this.add(newCommDish);
};
