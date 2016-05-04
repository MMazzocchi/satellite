var SolarPanel = function(flip) {
    THREE.Object3D.call(this);

    var rodGeom = new THREE.CylinderGeometry(20, 20, 80, 20, 1, false,
                                             0, 2*Math.PI);
    var rodMat  = new THREE.MeshLambertMaterial({ color: "#000022" });
    var rod     = new THREE.Mesh(rodGeom, rodMat);
    rod.rotation.z += Math.PI/2;
    rod.position.x += 150;
    this.add(rod);

    var panelGeom = new THREE.BoxGeometry(300, 300, 10);
    var panelMat  = new THREE.MeshLambertMaterial({ color: "#0000FF" });

    var panel     = new THREE.Mesh(panelGeom, panelMat);
    panel.position.x -= 40;
    this.add(panel);

    if(flip) {
        this.rotation.y += Math.PI;
    }

    this.length = 40;
    this.width  = 380;
    this.height = 300;
};

SolarPanel.prototype = Object.create(THREE.Object3D.prototype);
SolarPanel.prototype.constructor = SolarPanel;

var SolarPanels = function() {
    this.leftPanel = new SolarPanel(true);
    this.rightPanel = new SolarPanel(false);
};

SolarPanels.prototype.getLeftPanel = function() {
    return this.leftPanel;
};

SolarPanels.prototype.getRightPanel = function() {
    return this.rightPanel;
};
