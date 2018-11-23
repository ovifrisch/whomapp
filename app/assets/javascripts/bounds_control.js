var drag_array // map centers during drag

function add_bounds_listeners() {
  map.addListener('dragstart', drag_start_listener)
  map.addListener('drag', drag_listener)
  map.addListener('zoom_changed', zoom_listener)
}

function drag_start_listener() {
  drag_array = []
  drag_array.push(map.getCenter())
}

function drag_listener() {
  drag_array.push(map.getCenter())

  var bounds = map.getBounds();
  var sLat = bounds.getSouthWest().lat();
  var nLat = bounds.getNorthEast().lat();

  if (sLat < -85 || nLat > 85) {
    // we want to set the map back to the last accepted drag position, which is the second last of the drag_array
    map.panTo({lat: drag_array[drag_array.length - 2].lat(), lng: drag_array[drag_array.length - 2].lng()})
  }
}

// fix this later
function zoom_listener() {
  var bounds = map.getBounds();
  var sLat = bounds.getSouthWest().lat();
  var nLat = bounds.getNorthEast().lat();
  if (sLat < -85 || nLat > 85) {
    map.setZoom(map.getZoom() + 1)
  }
}
