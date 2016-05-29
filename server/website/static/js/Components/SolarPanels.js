var SolarPanel = function(data, flip) {
    THREE.Object3D.call(this);

    this.width  = data.width;
    this.height = data.height;
    this.color  = data.color;

    var rodGeom = new THREE.CylinderGeometry(20, 20, 80, 20, 1, false,
                                             0, 2*Math.PI);
    var rodMat  = new THREE.MeshLambertMaterial({ color: data.color });
    var rod     = new THREE.Mesh(rodGeom, rodMat);
    rod.rotation.z += Math.PI/2;
    rod.position.x += data.width/2;
    this.add(rod);

    var panelGeom = new THREE.BoxGeometry(data.width, data.height, 10);
    var panelMat  = new THREE.MeshLambertMaterial({ color: data.color });

    var panel     = new THREE.Mesh(panelGeom, panelMat);
    panel.position.x -= 40;
    this.add(panel);

    if(flip) {
        this.rotation.y += Math.PI;
    }

    this.length = 40;
    this.width  = data.width + 80;
    this.height = data.height;
};

SolarPanel.prototype = Object.create(THREE.Object3D.prototype);
SolarPanel.prototype.constructor = SolarPanel;

var SolarPanels = function(data) {
    Component.call(this, data.name, data.type, data.cost, data.description,
                   data.metrics);

    this.leftPanel = new SolarPanel(data, true);
    this.rightPanel = new SolarPanel(data, false);
};

SolarPanels.prototype = Object.create(Component.prototype);
SolarPanels.prototype.contructor = SolarPanels;

SolarPanels.prototype.getLeftPanel = function() {
    return this.leftPanel;
};

SolarPanels.prototype.getRightPanel = function() {
    return this.rightPanel;
};
