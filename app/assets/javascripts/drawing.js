// var drawing_manager
//
// function start_drawing() {
//   drawing_manager.setOptions({
// 	drawingMode: google.maps.drawing.OverlayType.POLYGON
//   })
// }
//
// function stop_drawing() {
//   drawing_manager.setOptions({
// 	drawingMode: null
//   })
// }
//
// function create_drawing_manager() {
//   drawing_manager = new google.maps.drawing.DrawingManager({
// 	drawingMode: null,
// 	drawingControl: true,
// 	polygonOptions: {
// 	  strokeColor: 'black',
// 	  strokeOpacity: 1.0,
// 	  fillOpacity: 0.0
// 	}
//   })
//   drawing_manager.setMap(map)
//
//   google.maps.event.addListener(drawing_manager, 'polygoncomplete', polygon_complete)
// }
//
// function polygon_complete(polygon) {
//   enclosed_markers = get_enclosed_markers(polygon)
//   user_ids = enclosed_markers.map(enclosed_markers => enclosed_markers.user_id)
//   positions = polygon.getPath().getArray()
//   create_conversation(user_ids, positions, polygon) // in chats.js
//   drawing_manager.setDrawingMode(null)
// }
//
// function get_enclosed_markers(polygon) {
//   enclosed_markers = []
//   for (var i = 0; i < markers.length; i++) {
// 	m = markers[i]
// 	console.log(m)
// 	if (google.maps.geometry.poly.containsLocation(m.getPosition(), polygon)) {
// 	  enclosed_markers.push(m)
// 	}
//   }
//   return enclosed_markers
// }
