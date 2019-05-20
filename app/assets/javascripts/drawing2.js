function disable() {
	map.setOptions({
	draggable: false,
	zoomControl: false,
	scrollwheel: false,
	disableDoubleClickZoom: false
  });
}

function enable(){
  map.setOptions({
	draggable: true,
	zoomControl: true,
	scrollwheel: true,
	disableDoubleClickZoom: true
  });
}

function draw_freehand() {
	poly = new google.maps.Polyline({map:map, clickable:false});

	var move = google.maps.event.addListener(map,'mousemove',function(e){
		poly.getPath().push(e.latLng);
	});

	//mouseup-listener
	google.maps.event.addListenerOnce(map,'mouseup',function(e){
		map.setOptions({draggableCursor:'grab'});
		google.maps.event.removeListener(move);
		var path = poly.getPath()
		poly.setMap(null);
		poly = new google.maps.Polygon({map:map,path:path, fillOpacity:0.0, strokeOpacity: 1.0, strokeColor: 'black'});
		google.maps.event.clearListeners(map.getDiv(), 'mousedown');
		enable();
		polygon_complete(poly);
	});
}

function stop_drawing() {
	enable();
	map.setOptions({draggableCursor:'grab'});
}

function start_drawing() {
	disable();
	map.setOptions({draggableCursor:'cell'});
	google.maps.event.addDomListener(map.getDiv(), 'mousedown', function(e) {
		console.log("mouse down for drawing!")
		draw_freehand();
	})
}

function polygon_complete(polygon) {
  enclosed_markers = get_enclosed_markers(polygon)
  user_ids = enclosed_markers.map(enclosed_markers => enclosed_markers.user_id)
  positions = polygon.getPath().getArray()
  create_conversation(user_ids, positions, polygon) // in chats.js
}

function get_enclosed_markers(polygon) {
  enclosed_markers = []
  for (var i = 0; i < markers.length; i++) {
	m = markers[i]
	if (google.maps.geometry.poly.containsLocation(m.getPosition(), polygon)) {
	  enclosed_markers.push(m)
	}
  }
  return enclosed_markers
}
