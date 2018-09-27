var maps = document.getElementById("maps");
var map;
var geocoder;
var directionDisplay;
var directionService;
var placesService;
var panel;
var infoWindow;
var isFullScreen = false;
var markers = [];
var departInput = document.getElementById("departures");
var arrivalsInput = document.getElementById("arrival");
var searchButton = document.getElementById("search");
var travelMode = document.getElementById("travel-mode");
var searchBox;
var searchBox2;
var monumenttype = document.getElementById("monumenttype");
var waypoints = [];
var container = document.getElementById("container");
var buttonCalcul = document.getElementById("buttonCalcul");
var checkpoint = [];
var defaultSelect = document.getElementById('defaultSelect');
var nightSelect = document.getElementById('nightSelect');
var retroSelect = document.getElementById('retroSelect');
var rainbowSelect = document.getElementById('rainbowSelect');
var nightlightSelect = document.getElementById('nightlightSelect');
var caribeanSelect = document.getElementById('caribeanSelect');
var museumSelect = document.getElementById('museumSelect');
var parkSelect = document.getElementById('parkSelect');
var restoSelect = document.getElementById('restoSelect');

var night = [{"elementType":"geometry","stylers":[{"color":"#22313F"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"22313F"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}]

var bases = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":47.46},{"lightness":40.94},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":0},{"lightness":41.94},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":48.99},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":0},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":0},{"lightness":1.87},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":0},{"lightness":17.77},{"gamma":1}]}];

var retro = [{"featureType":"administrative","stylers":[{"visibility":"on"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#2C3E50"},{"lightness":50}]},{"stylers":[{"saturation":-20},{"gamma":0.40}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#2C3E50"}]}];

var caribean = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#000"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fff"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fff"},{"weight":0}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"lightness":"0"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"0"},{"saturation":"0"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"weight":"0"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.stroke","stylers":[{"weight":"0"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#8A4B08"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#8A4B08"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#8A4B08"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#8A4B08"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#8A4B08"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#8A4B08"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#8A4B08"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0080FF"}]}];

var rainbow = [{"elementType":"geometry","stylers":[{"color":"#01DF01"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#FA58D0"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#FA58D0"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#FA58D0"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#DF0101"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#F7FE2E"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#F7FE2E"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#F7FE2E"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#fff"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#DF0101"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#4000FF"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#4000FF"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#4000FF"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#4000FF"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4000FF"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#0040FF"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#0040FF"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"22313F"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#0080FF"}]}]

var nightandlight = [{"elementType":"geometry","stylers":[{"color":"#fff"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"22313F"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#000"}]}]



function initMap () {
    var departuresPoint = new google.maps.LatLng(46.779231, 2.659431);

    var options = {
        center: departuresPoint,
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDoubleClickZoom: false,
        draggable: true,
        scrollwheel: true,
        fullscreenControl: true
    };

    map = new google.maps.Map(maps, options);

    geocoder = new google.maps.Geocoder();
    infoWindow = new google.maps.InfoWindow();

    panel = document.getElementById("maps-results");
    directionDisplay = new google.maps.DirectionsRenderer({
        map: map,
        panel: panel,
        draggable: true
    });

    directionService = new google.maps.DirectionsService();
    placesService = new google.maps.places.PlacesService(map);
    searchBox = new google.maps.places.SearchBox(departInput);
    searchBox2 = new google.maps.places.SearchBox(arrivalsInput);

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        var placeSearch = function (places) {
            if (places.length === 0) {
                return;
            }

            var markCleans = function (markers) {
                markers.forEach(function (m) {
                    m.setMap(null);
                });
                markers = [];
            };

            
            markCleans(markers);
            directionDisplay.set("directions", null);

            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (p) {
                var icon = {
                    url: p.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: p.name,
                    position: p.geometry.location
                }));

                if (p.geometry.viewport) {
                    bounds.union(p.geometry.viewport);
                } else {
                    bounds.extend(p.geometry.location);
                }
            });
            map.fitBounds(bounds);
        };
        placeSearch(places);
    });

    var geolocalisation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                var marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    animation: google.maps.Animation.DROP
                });
                markers.push(marker);

                var reverseGeocode = function (pos) {
                    geocoder.geocode({'location': pos}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                map.setZoom(13);
                                departInput.value = results[0].formatted_address;
                            }
                        }
                    });
                };

                reverseGeocode(pos);
            });
        }
    };

    geolocalisation();

    google.maps.event.addListener(map, 'click', function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var pos = {
            lat: lat,
            lng: lng
        };

        if(departInput.value === ""){
            departInput.value = "" + lat + ", " + lng;
            map.setCenter(pos);
                var marker = new google.maps.Marker({
                position: pos,
                map: map,
                animation: google.maps.Animation.DROP 
            });
        }
        else if(arrivalsInput.value === ""){
            arrivalsInput.value = "" + lat + ", " + lng;
            map.setCenter(pos);
                var marker = new google.maps.Marker({
                position: pos,
                map: map,
                animation: google.maps.Animation.DROP 
            });
        }
    });
    if (localStorage.getItem("MyMapsRoute") !== null) {
        directionDisplay.set("directions", JSON.parse(localStorage.getItem("MyMapsRoute")));
    }
};
var searchByString = function (string) {
    var markCleans = function (markers) {
        markers.forEach(function (m) {
            m.setMap(null);
        });
        markers = [];
    };
    
    markCleans(markers);
    directionDisplay.set("directions", null);


    var request = {
        query: string
    };

    placesService.textSearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {

            markCleans(markers);

            var coords = results[0].geometry.location;
            map.setCenter(coords);

            var marker = new google.maps.Marker({
                position: coords,
                map: map,
                animation: google.maps.Animation.DROP
            });
            markers.push(m);

            departInput.value = results[0].formatted_address;
        }
    });
};

var goMaps = function () {
    var begin = departInput.value;
    var end = arrivalsInput.value;
    var mode;

    var markCleans = function (markers) {
        markers.forEach(function (m) {
            m.setMap(null);
        });
        markers = [];
    };
    
    markCleans(markers);

    directionDisplay.set("directions", null);

    switch (travelMode.value) {
        case "bicycling":
        mode = google.maps.TravelMode.BICYCLING;
        break;
        case "walking":
        mode = google.maps.TravelMode.WALKING;
        break;
        default:
        mode = google.maps.TravelMode.DRIVING;
        break;
    }

    if (begin !== "" && end !== "") {
        var request = {
            origin: begin,
            destination: end,
            travelMode: mode
        };

        directionService.route(request, function (result, status) {
            if (status === google.maps.DirectionsStatus.OK) {

                var pointsKm = function (km) {
                    waypoints = [];
                    var coords = [];
                    var i = 0;
                    for (i = 1; i <= 10; i++) {
                        coords.push(km[(i * (Math.floor(km.length / 10)) - 1)]);
                    }

                    var myArray = [];
                    for (var z = 0; z < monumenttype.length; z++) {
                        if (monumenttype.options[z].selected) {
                            myArray.push(monumenttype.options[z].value);
                        }
                    }

                    coords.forEach(function (coord) {

                        request = {
                            location: coord,
                            radius: result.routes[0].legs[0].distance.value * 0.2,
                            type: myArray[Math.floor(Math.random()*(myArray.length))]
                        };
                        placesService.nearbySearch(request, function (results) {
                           var locate;
                           var count = 0;
                           if (results !== null) {

                                var positions = function(name) {
                                    if(checkpoint.indexOf(name) !== -1) {
                                        locate = results[count].geometry.location;
                                        name = results[count].name;
                                        checkpoint.push(name);
                                        count++;
                                        positions(results[count].name);
                                    } else {
                                        locate = results[count].geometry.location;
                                        name = results[count].name;
                                        checkpoint.push(name);
                                    }
                                };
                                positions(results[count].name);
                            }
                            waypoints.push({
                                location: locate,
                                stopover: true,
                            });
                        });
                    });

                    setTimeout(function () {
                        request = {
                            origin: begin,
                            destination: end,
                            travelMode: mode,
                            waypoints: waypoints,
                            optimizeWaypoints: true
                        };

                        directionService.route(request, function (rep, status) {
                            if (status === google.maps.DirectionsStatus.OK) {
                                directionDisplay.setDirections(rep);
                                localStorage.setItem("MyMapsRoute", JSON.stringify(result));
                            }
                        });
                    }, 1500);
                };
                pointsKm(result.routes[0].overview_path);
            }
        });
    }
};

var fullscreen = function () {
    if (false === isFullScreen) {
        isFullScreen = true;
        maps.style.width = "100%";
        maps.style.height = "100%";
    } else {
        isFullScreen = false;
        maps.style.width = "800px";
        maps.style.height = "600px";
    }
    google.maps.event.trigger(map, "resize");
};

var manualFullScreen = function () {
    if (false === isFullScreen) {
        if (maps.webkitRequestFullScreen) {
            maps.webkitRequestFullScreen();
        }
        if (maps.mozRequestFullScreen) {
            maps.mozRequestFullScreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
};

document.addEventListener("keydown", function (e) {
    if (e.target.tagName !== "INPUT") {
        switch (e.keyCode) {
            case 70:
            manualFullScreen();
            break;
        }
    }
});
document.addEventListener("webkitfullscreenchange", function () {
    fullscreen();
});
document.addEventListener("fullscreenchange", function () {
    fullscreen();
});
document.addEventListener("mozfullscreenchange", function () {
    fullscreen();
});


searchButton.addEventListener("click", function () {
    if (departInput.value !== "") {
        if (arrivalsInput.value === "") {
            searchByString(departInput.value);
        } else {
            goMaps();
        }
    }
});

nightSelect.addEventListener('click', function(){
  document.body.setAttribute("id", "");
  document.body.setAttribute("id", "night");
  var nightMap = new google.maps.StyledMapType(night, {name: "night"});
  map.mapTypes.set('night', nightMap);
  map.setMapTypeId('night');
});

caribeanSelect.addEventListener('click', function() {
  document.body.setAttribute("id", "");
  document.body.setAttribute("id", "caribean");
  var caribeanMap = new google.maps.StyledMapType(caribean, {name: "caribean"});
  map.mapTypes.set('caribean', caribeanMap);
  map.setMapTypeId('caribean');
});

retroSelect.addEventListener('click', function() {
  document.body.setAttribute("id", "");
  document.body.setAttribute("id", "retro");
  var retroMap = new google.maps.StyledMapType(retro, {name: "retro"});
  map.mapTypes.set('retro', retroMap);
  map.setMapTypeId('retro');
});

defaultSelect.addEventListener('click', function(){
  document.body.setAttribute("id", "");
  var basesMap = new google.maps.StyledMapType(bases, {name: "bases"});
  map.mapTypes.set('bases', basesMap);
  map.setMapTypeId('bases');
});


rainbowSelect.addEventListener('click', function() {
  document.body.setAttribute("id", "");
  var rainbowMap = new google.maps.StyledMapType(rainbow, {name: "rainbow"});
  map.mapTypes.set('rainbow', rainbowMap);
  map.setMapTypeId('rainbow');
});

nightlightSelect.addEventListener('click', function() {
  document.body.setAttribute("id", "");
  var nightandlightMap = new google.maps.StyledMapType(nightandlight, {name: "nightandlight"});
  map.mapTypes.set('nightandlight', nightandlightMap);
  map.setMapTypeId('nightandlight');
});

container.style.display = "none";

buttonCalcul.addEventListener("click", function (){
    if(container.style.display === "none")
        $('#container').show(500);
    else
        $('#container').hide(500);
});
