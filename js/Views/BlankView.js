var BlankView = function(satellite) {
    View.call(this, "Blank View");
};

BlankView.prototype = Object.create(View.prototype);
BlankView.prototype.constructor = BuildView;

BlankView.prototype.step = function() {};
