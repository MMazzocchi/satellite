var renderer;
var currentView;

var navigation;
var cache;

function step() {
    currentView.step();
    currentView.render(renderer);
}

function setup() {
    navigation = new Navigation();
    navigation.loadHomeView();

    cache = new ComponentCache();

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

    // Adjust the height of the menu and status panes, forcing them to scroll
    var menuPane = $('#menuPane')[0];
    var navBar = $('#navHeader')[0];
    var menuHeight = window.innerHeight - navBar.offsetHeight;
    menuPane.style.height = menuHeight + "px";

    var statusPane = $('#statusPane')[0];
    var statusHeader = $('#statusHeader')[0];
    var statusHeight = window.innerHeight - statusHeader.offsetHeight;
    statusPane.style.height = statusHeight + "px";

    setInterval(step, 40);
}
setup();
