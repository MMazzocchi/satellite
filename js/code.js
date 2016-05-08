var renderer;
var currentView;
var currentMenu;

function step() {
    currentView.step();
    currentView.render(renderer);
}

function setup() {
    // Setup the renderer
    renderer = new THREE.WebGLRenderer();

    // Determine the best dimensions for the renderer.
    var viewColumn = $('#viewColumn')[0];

    // Pick the shortest length between the width of the column, and the height
    // of the window. We don't want a vertical scrollbar.
    var dimension = viewColumn.offsetWidth;
    if(dimension > window.innerHeight) {
        dimension = window.innerHeight;
    }
    renderer.setSize(dimension, dimension);
    $('#viewColumn').append(renderer.domElement);

    currentView = new BuildView();

    currentMenu = new MenuPane();
    $('#menuColumn').append(currentMenu.generateElement());

    setInterval(step, 40);
}
setup();
