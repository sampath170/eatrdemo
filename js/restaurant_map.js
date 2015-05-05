var RestaurantMapViewModel = (function() {

    "use strict";

    function RestaurantMapViewModel() {

        var mapConfig = {elementId:'default',lookUpApi:''};
        var self = this;

        this.init = function(config){
            this.restaurantsList = ko.observableArray([]);
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

        this.ratingVal = function (rating) {
           return (Math.round(rating));
        };

        this.showMarker = function(data,event){
            var key = data.geometry.location.A+','+data.geometry.location.F;
            window.coordsMap[key].open(map,window.markersMap[key]);
        };

        this.callback = function(results, status) {
          window.coordsMap = new Object();
          window.markersMap = new Object();

          if (status == google.maps.places.PlacesServiceStatus.OK) {
            window.resultsHover = new Array();
            window.resultsHover = results;
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
              console.log(results[i]);
              self.restaurantsList.push(results[i]);
              //createMarker(results[i]);
                var coords = place.geometry.location;

               var marker = new google.maps.Marker({
                         position: coords,
                         map: map,
                         title: 'Marker'+i,
                             icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+(i+1)+'|01A9DB|ffffff'
                         });

                        if(i==0){
                            var locName = results[i]['vicinity'];
                            if(locName != null && locName.length > 30)
                                locName = locName.substring(0,30)+'...';
                            $('.iconTextBox').val(locName);
                        }
                         //adding info window
                        var contentString = '<div><span style="font-size:14px"><b>'+results[i]['name']+'</b></span><div>'+results[i]['vicinity']+'</div></div>';
                        var infowindow = new google.maps.InfoWindow({ content: contentString
                                                                            });

                        var coordsKey = coords.A+','+coords.F;
                        window.coordsMap[coordsKey] = infowindow;
                        window.markersMap[coordsKey] = marker;

                         //info window listener
                         google.maps.event.addListener(marker, 'click', function(e) {
                             var key = e.latLng.A+','+e.latLng.F;
                             var val = e.target;
                             window.coordsMap[key].open(map,window.markersMap[key]);
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

            $('#'+mapConfig.elementId).css('width',screen.width*.63);
            $('#'+mapConfig.elementId).css('height',screen.height);

             var request = {
               location: coords,
               radius: '2500',
               types: ['food']
             };

           var service = new google.maps.places.PlacesService(this.map);
           service.nearbySearch(request, self.callback);

        };

     };

    return RestaurantMapViewModel;
})();

