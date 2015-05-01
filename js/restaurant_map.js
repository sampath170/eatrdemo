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

            var apiUrl = mapConfig.lookUpApi + 77 + ',' + 66;

            $.ajax({
                type: 'GET',
                contentType: "application/jsonp",
                dataType: 'json',
                cache: false,
                url: apiUrl + '&r=' + Math.random(),
                success: function(data) {
                    console.log('res data:',data);
                },error: function(data){
                    console.log('res error',data)
                }});

        };

        this.callback = function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
              console.log(results[i]);
              //createMarker(results[i]);
                var coords = place.geometry.location;
              var marker = new google.maps.Marker({
                         position: coords,
                         map: map,
                         title: "Current location!",
                             icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+i+'|FF0000|000000'
                         });


                         //adding info window
                         var contentString = '<div>'+results[i]['name']+'</div>';

                         var infowindow = new google.maps.InfoWindow({
                             content: contentString
                         });


                         //info window listener
                         google.maps.event.addListener(marker, 'click', function() {
                             infowindow.open(map,marker);
                           });

            }
          }
        }

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



             var request = {
               location: coords,
               radius: '2500',
               types: ['food']
             };

           var service = new google.maps.places.PlacesService(this.map);
           service.nearbySearch(request, self.callback);

           //self.locateNearbyRestaurants(latitude,longitude);

           //place the initial marker




           // new marker
           /*var myLatlng = new google.maps.LatLng(12.9567392,77.7005113);
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
             });*/

        };

     };

    return RestaurantMapViewModel;
})();

