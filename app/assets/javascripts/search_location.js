

$(document).ready(function() {
  $('#search_loc_button').click(function() {
    querried_location = document.getElementById("search_loc_field").value
    document.getElementById("search_loc_field").value = "";
    address = querried_location + ", us";
    var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': querried_location}, function(results, status) {
      if(results.length == 0) {
        return
      }
      latitude = results[0].geometry.location.lat();
      longitude = results[0].geometry.location.lng();
      map.setCenter({lat: latitude, lng: longitude});
      map.setZoom(12);
    });
  })

  $('#search_loc_field').keypress(function(e){
    if(e.keyCode==13) {
      e.preventDefault();
      $('#search_loc_button').click();
    }
    });
})

function location_requested() {

}
