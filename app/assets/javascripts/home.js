var user_lat;
var user_long;
var map;

function pin_at_position(latitude, longitude) {
  loc = {lat: latitude, lng: longitude};
  marker = new google.maps.Marker({
    position: loc,
    map: map
  })
}

function init_position_success(user_position) {
  user_lat = user_position.coords.latitude;
  user_long = user_position.coords.longitude;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: user_lat, lng: user_long},
    zoom: 14
  });

  map.setMapTypeId("satellite");

  pin_at_position(user_lat, user_long);
}

function initMap() {
  navigator.geolocation.getCurrentPosition(init_position_success);
}


$(document).ready(function(){
  $("#test_btn").click(function() {
    //draw a line between 400 Ortega Avenue and 164 Orchard Park Drive

    // need to make a geocoding request
    coords = [
      {lat: 38.541383, lng: -121.761078},
      {lat: 14.259155, lng: -3.389085}
    ];

    line = new google.maps.Polyline({
      path: coords,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    line.setMap(map);
  })
});
