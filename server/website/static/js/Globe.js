var GLOBE_SEGMENTS = 30;
var GLOBE_RADIUS = 500;

function getTextSprite(text, color) {
    var scratchCanvas = document.createElement('canvas');
    scratchCanvas.width = 256;
    scratchCanvas.height = 64;
    var scratchCtx = scratchCanvas.getContext('2d');

    scratchCtx.font = "900 52px monospace";

    scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    scratchCtx.fillStyle = color;
    scratchCtx.fillText(text, 5, 47);
    scratchCtx.strokeStyle = color;
    scratchCtx.lineWidth = 8;
    scratchCtx.strokeRect(0, 0, scratchCanvas.width, scratchCanvas.height);

    var map = new THREE.Texture(scratchCanvas);
    map.needsUpdate = true;

    var mat = new THREE.SpriteMaterial({ map: map });
    var sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.5*scratchCanvas.width, 1.5*scratchCanvas.height);

    return sprite;
}

var Sector = function(color, id) {
    this.color = color;
    this.id = id;

    var sectorSegments = GLOBE_SEGMENTS/2;

    // Create the transparent main section of the sector
    var sectorGeom = new THREE.SphereGeometry(GLOBE_RADIUS+10, sectorSegments, 
                                              sectorSegments,
                                              0, Math.PI/2, 0, Math.PI/2);

    var sectorMat = new THREE.MeshLambertMaterial({ color: color });
    sectorMat.transparent = true;
    sectorMat.opacity = 0.5;
 
    THREE.Mesh.call(this, sectorGeom, sectorMat);

    var outlineWidth = 0.02;
    var sectorOutlineMat = new THREE.MeshLambertMaterial({ color: color });

    // Create the outline; bottom
    var sectorOutline1Geom = new THREE.SphereGeometry(GLOBE_RADIUS+11,
                                                      sectorSegments, 1,
                                                      0, Math.PI/2,
                                                      (0.5-outlineWidth)*Math.PI,
                                                      outlineWidth*Math.PI);
    var sectorOutline1 = new THREE.Mesh(sectorOutline1Geom, sectorOutlineMat);
    this.add(sectorOutline1);

    // Create the outline; right
    var sectorOutline2 = new THREE.Mesh(sectorOutline1Geom, sectorOutlineMat);
    sectorOutline2.rotateX(-0.5*Math.PI);
    sectorOutline2.rotateZ(0.5*Math.PI);
    this.add(sectorOutline2);

    // Create the outline; left 
    var sectorOutline3 = new THREE.Mesh(sectorOutline1Geom, sectorOutlineMat);
    sectorOutline3.rotateZ(Math.PI);
    sectorOutline3.rotateX(0.5*Math.PI);
    sectorOutline3.rotateY(0.5*Math.PI);
    this.add(sectorOutline3);

    // Make the sector label
    var label = getTextSprite("Sector "+ id, "#FFFFFF");
    label.position.x -= 385;
    label.position.y += 385;
    label.position.z += 385;
    this.add(label);
};

Sector.prototype = Object.create(THREE.Mesh.prototype);
Sector.prototype.constructor = Sector;

var Globe = function() {

    // Create the surface.
    var globeGeom = new THREE.SphereGeometry(GLOBE_RADIUS,
                                             GLOBE_SEGMENTS, GLOBE_SEGMENTS,
                                             0, 2*Math.PI, 
                                             0, Math.PI);
    var globeMat  = new THREE.MeshLambertMaterial({ color: "#0000FF" });
    THREE.Mesh.call(this, globeGeom, globeMat);

    // Create each sector
    var sector1 = new Sector("#FF0000", 1);
    this.add(sector1);

    var sector2 = new Sector("#00FF00", 2);
    sector2.rotateY(0.5*Math.PI);
    this.add(sector2);

    var sector3 = new Sector("#000088", 3);
    sector3.rotateY(Math.PI);
    this.add(sector3);

    var sector4 = new Sector("#FFFF00", 4);
    sector4.rotateY(1.5*Math.PI);
    this.add(sector4);

    var sector5 = new Sector("#00FFFF", 5);
    sector5.rotateX(0.5*Math.PI);
    this.add(sector5);

    var sector6 = new Sector("#FF00FF", 6);
    sector6.rotateY(Math.PI/2);
    sector6.rotateX(Math.PI/2);
    this.add(sector6);

    var sector7 = new Sector("#000000", 7);
    sector7.rotateY(Math.PI);
    sector7.rotateZ(Math.PI/2);
    this.add(sector7);

    var sector8 = new Sector("#FFFFFF", 8);
    sector8.rotateY(1.5*Math.PI);
    sector8.rotateZ(Math.PI/2);
    this.add(sector8);
};

Globe.prototype = Object.create(THREE.Mesh.prototype);
Globe.prototype.constructor = Globe;

