var RestaurantMapViewModel = (function() {

    "use strict";

    function RestaurantMapViewModel() {

        var mapConfig = {elementId:'default',lookUpApi:''};
        var self = this;

        this.init = function(config){

            if(typeof config === 'undefined' ||
                (config != null && !config.hasOwnProperty('elementId')))
                alert('Error initializing RestaurantMapViewModel.');
            else
                mapConfig = config;

        }

        this.locateNearbyRestaurants = function(latitude,longitude){

            var apiUrl = mapConfig.lookUpApi + latitude + ',' + longitude;

            $.ajax({
                type: 'GET',
                dataType: "json",
                contentType: "application/json",
                accept: {
                    json: 'json'
                },
                url: apiUrl + '&r=' + Math.random(),
                success: function(data) {
                    console.log('res data:',data);
                }});

        };

        this.showLocation = function(position) {

           var latitude = position.coords.latitude;
           var longitude = position.coords.longitude;
           var coords = new google.maps.LatLng(latitude, longitude);

           var mapOptions = {
               zoom: 15,
               center: coords,
               mapTypeControl: true,
               mapTypeId: google.maps.MapTypeId.ROADMAP
           };

           //create the map, and place it in the HTML map div
           this.map = new google.maps.Map(
           document.getElementById(mapConfig.elementId), mapOptions
           );

           self.locateNearbyRestaurants(latitude,longitude);

           //place the initial marker
           var marker = new google.maps.Marker({
           position: coords,
           map: this.map,
           title: "Current location!",
               icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|FF0000|000000'
           });


           //adding info window
           var contentString = '<div id="content">test content</div>';

           var infowindow = new google.maps.InfoWindow({
               content: contentString
           });


           //info window listener
           google.maps.event.addListener(marker, 'click', function() {
               infowindow.open(this.map,marker);
             });




           // new marker
           var myLatlng = new google.maps.LatLng(12.9567392,77.7005113);
           var marker2 = new google.maps.Marker({
               position: myLatlng,
               map: this.map,
               title: 'Hello World2!',
               icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=2|FF0000|000000'
           });

           var infowindow2 = new google.maps.InfoWindow({
               content: 'iw 2'
           });

           google.maps.event.addListener(marker2, 'click', function() {
               infowindow2.open(this.map,marker2);
             });

        };

     };

    return RestaurantMapViewModel;
})();

