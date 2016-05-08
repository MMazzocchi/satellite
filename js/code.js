var renderer;
var currentView;

function step() {
    currentView.step();
    currentView.render(renderer);
}

function setCurrentView(newView) {
    var menuColumn = $('#menuColumn');
    var statusColumn = $('#statusColumn');

    menuColumn.html("");
    statusColumn.html("");

    menuColumn.append(newView.getMenuElement());
    statusColumn.append(newView.getStatusElement());

    currentView = newView;
}

function setup() {
    // Setup the renderer
    renderer = new THREE.WebGLRenderer();

    var view = new View();
    setCurrentView(view);

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

    setInterval(step, 40);
}
setup();
