(function() {

    "use strict";

    function AppHomeViewModel() {

        this.restaurantMap = new RestaurantMapViewModel();

        //on app load
        this.init = function(){

            this.loadMap();

        };

        //loads the map view on the left panel
        this.loadMap = function(){
            var mapConfig = {elementId:'mapPlaceholder',lookUpApi:'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=1000&types=food&key=AIzaSyAAQDBkknB7GXdWC0v9g-_01L3WfQADxvQ&location='};

            this.restaurantMap.init(mapConfig);

            if (navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(this.restaurantMap.showLocation);
            }
            else
            {
               alert("Geolocation API not supported.");
            }
            ko.applyBindings(this.restaurantMap,document.getElementById('restaurantsList'));
        }

        this.init();//load the app

     };

    var appHomeViewModel = new AppHomeViewModel();

    return appHomeViewModel;
})();