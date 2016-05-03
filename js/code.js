var renderer;
var currentView;

function step() {
    currentView.step();
    currentView.render(renderer);
}

function setup() {

    // Setup three.js
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    $('#container').append(renderer.domElement);

    currentView = new BuildView();

    setInterval(step, 40);
}
setup();
