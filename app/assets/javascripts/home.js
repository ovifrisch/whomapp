var user_lat;
var user_long;
var map;
var current_user_id;
var test = 8

function click_marker(marker) {
  create_conversation(marker.user_id)
}

function pin_at_position(user_id, latitude, longitude) {
  loc = {lat: latitude, lng: longitude};
  var icon;
  var marker;

  // if this is the current user
  if (user_id == current_user_id) {
    icon = {
      url: 'https://www.paraglidingmap.com/app/images/logo.svg',
      scaledSize: new google.maps.Size(50, 50) // scaled size
    }
    console.log(loc)
    marker = new google.maps.Marker({
      position: loc,
      map: map,
      icon: icon,
      user_id: user_id
    })
  }

  //if it's anyone else
  else {
    icon = {
        url: 'https://www.chilterns2030s.org.uk/ramblers/images/marker-start.png', // url
        scaledSize: new google.maps.Size(50, 50) // scaled size
    };
    marker = new google.maps.Marker({
      position: loc,
      map: map,
      icon: icon,
      title: "Click to Chat!",
      user_id: user_id
    })
  }
  marker.addListener('click', function() {
    click_marker(marker);
  });
}

function set_all_pins(locations_hash) {
  for (var i = 0; i < locations_hash.length; i++) {
    pin_at_position(locations_hash[i].id, locations_hash[i].latitude, locations_hash[i].longitude);
  }
}

function init_position_success(user_position) {

  //get the current user's location
  user_lat = user_position.coords.latitude;
  user_long = user_position.coords.longitude;
  console.log(user_lat, user_long)

  // update this location in the db with a POST
  $.ajax({
    url: "users/update_current_user_location",
    type: "POST",
    dataType:"json",
    data: {longitude: user_long, latitude: user_lat}
  });

  //create the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: user_lat, lng: user_long},
    zoom: 14,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });

  // make a GET request for the current user's id
  $.ajax  ({
    url: "users/get_current_user",
    type: "GET",
    dataType: "json",
    success: function(id) {
      current_user_id = id;
      // make a GET request for all user's locations
      $.ajax({
        url: "users/get_user_locations",
        type: "GET",
        dataType: "json",
        success: set_all_pins
      });
    }
  });
}

function initMap() {
  navigator.geolocation.getCurrentPosition(init_position_success);
}


$(document).ready(function(){
  // $("#test_btn").click(function() {
  //   //draw a line between 400 Ortega Avenue and 164 Orchard Park Drive
  //
  //   // need to make a geocoding request
  //   coords = [
  //     {lat: 38.541383, lng: -121.761078},
  //     {lat: 14.259155, lng: -3.389085}
  //   ];
  //
  //   line = new google.maps.Polyline({
  //     path: coords,
  //     geodesic: true,
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 2
  //   });
  //
  //   line.setMap(map);
  // })



  $("#home_btn").click(function() {
    map.setZoom(14);
    map.panTo({lat: user_lat, lng: user_long});
  })

});
