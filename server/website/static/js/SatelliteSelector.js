var SatelliteSelector = {
    selectors: {},
  
    instatiate: function(callback) {
        this.remove();
  
        cache.getUserData(function(data) {
  
            var numSats = data.satellites;
  
            // For each satellite selector visible, store some data and attach
            // events to the buttons.
            $('.satellite-selector').each(function(i, element) {
  
                // Create an object to hold data for this particular selector.
                SatelliteSelector.selectors[i] = {
                    index: 0,
                    total: numSats 
                };
  
                var btns = $( element ).children('.btn-group');
                var name = $( element ).children('#satellite-name')[0];
                var help = $( element ).children('#noSatHelpText')[0];
                var selector = SatelliteSelector.selectors[i];

                // The function to call when the data is selected
                function satSelected(data) {
                    name.innerHTML = data.name;
                    help.innerHTML = "";

                    callback(data);
                }
  
                // On click, advance to the next satellite
                btns.children('#satellite-right').click(function() {
                    if(selector.total > 0) {
                        selector.index = (selector.index + 1) %  selector.total;
                        cache.getSatelliteData(selector.index + 1, satSelected);
                    }
                });
  
                // On click, advance to the next satellite
                btns.children('#satellite-left').click(function() {
                    if(selector.total > 0) {
                        selector.index = (selector.index + (selector.total - 1)) % 
                                         selector.total;
                        cache.getSatelliteData(selector.index + 1, satSelected);
                    }
                });
            });
        });
    },
  
    remove: function() {
        $('.satellite-right').unbind("click");
        $('.satellite-left').unbind("click");
    
        this.selectors = {};
    }
};
