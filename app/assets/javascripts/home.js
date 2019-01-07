var map;
var current_user_id;
var markers = [];
var successful_geolocation = false
var user_lat = 70
var user_long = 70

function initMap() {
  x = navigator.geolocation.getCurrentPosition(init_position_success);
  if (!successful_geolocation) {
    console.log("unsuccessful geolocation")
    initiate()
  }
}

function init_position_success(user_position) {
  successful_geolocation = true
  user_lat = user_position.coords.latitude;
  user_long = user_position.coords.longitude;
  update_current_user_location()
  initiate()
}

function initiate() {
  create_map()
  create_drawing_manager()
  set_current_user()
  get_all_users_locations() //will also set them in the callback
}

function update_current_user_location() {
  $.ajax({
    url: "users/update_current_user_location",
    type: "POST",
    dataType:"json",
    data: {longitude: user_long, latitude: user_lat}
  });
}


function create_map() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: user_lat, lng: user_long},
    zoom: 14,
    minZoom: 2,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });

  google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
    console.log("loaded");
    $(".loader").css("visibility", "hidden")
  });

  add_bounds_listeners() // in bounds_contrl.js
}

function set_current_user() {
  $.ajax  ({
    url: "users/get_current_user",
    type: "GET",
    dataType: "json",
    success: function(id) {
      current_user_id = id;
    }
  });
}

function get_all_users_locations() {
  $.ajax({
    url: "users/get_user_locations",
    type: "GET",
    dataType: "json",
    success: set_all_users_locations
  });
}

function set_all_users_locations(locations_hash) {
  for (var i = 0; i < locations_hash.length; i++) {
    marker = pin_at_position(locations_hash[i].id, locations_hash[i].latitude, locations_hash[i].longitude);
    markers.push(marker)
  }
}

function pin_at_position(user_id, latitude, longitude) {
  loc = {lat: latitude, lng: longitude};
  var marker;

  if (user_id == current_user_id) {
    marker = current_user_marker(user_id, loc)
  }
  else {
    marker = anonymous_user_marker(user_id, loc)
  }
  marker.addListener('click', function() {
    click_marker(marker);
  });
  return marker
}

function current_user_marker(user_id, loc) {
  icon = {
    url: 'https://www.paraglidingmap.com/app/images/logo.svg',
    scaledSize: new google.maps.Size(50, 50) // scaled size
  }
  marker = new google.maps.Marker({
    position: loc,
    map: map,
    icon: icon,
    user_id: user_id
  })
  return marker
}

function anonymous_user_marker(user_id, loc) {
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
  return marker;
}

function click_marker(marker) {
  create_conversation([marker.user_id], [marker.getPosition()])
}

function panToCurrentUser() {
  map.panTo({lat: user_lat, lng: user_long});
}

$(document).ready(function(){

  // LOGO BTN CLICKED
  $("#home_btn").click(function() {
    map.setZoom(14);
    map.panTo({lat: user_lat, lng: user_long});
  })
});
