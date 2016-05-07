var BlankView = function(satellite) {
    View.call(this, "Blank View");
};

BuildView.prototype = Object.create(View.prototype);
BuildView.prototype.constructor = BuildView;

BuildView.prototype.step = function() {};
