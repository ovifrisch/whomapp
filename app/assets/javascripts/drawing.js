var drawing_manager

function create_drawing_manager() {
  drawing_manager = new google.maps.drawing.DrawingManager({
    drawingMode: null,
    drawingControl: true,
    drawingControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_RIGHT,
            drawingModes: ['polygon']
          }
  })
  drawing_manager.setMap(map)

  google.maps.event.addListener(drawing_manager, 'polygoncomplete', polygon_complete)
}

function polygon_complete(polygon) {
  polygon_fadeout()
  enclosed_markers = get_enclosed_markers(polygon)

  // in chats.js
  create_conversation(enclosed_markers.map(enclosed_markers => enclosed_markers.user_id))
  polygon.setMap(null)
  drawing_manager.setDrawingMode(null)
}

// https://stackoverflow.com/questions/9541240/is-there-a-way-to-fade-out-a-v3-google-maps-polygon
function polygon_fadeout() {}

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










//
