var max_open_chats = 5
var num_open_chats = 0


// CLICK USER ON MAP OR CALLED AFTER POLYGON DRAWN (drawing.js)
function create_conversation(user_ids, positions, polygon = null) {
  positions = positions.map(positions => [positions.lat(), positions.lng()])
  if (user_ids.length == 0) {
    $('#cname_modal').modal('hide');
    if (polygon != null) {
      polygon.setMap(null)
    }
    return
  }

  $.ajax({
    url: "chatrooms/validate_chatroom",
    type: "GET",
    dataType: "json",
    data: {users: user_ids},
    success: function(valid) {
      if (valid) {
        $('#cname_modal').modal('show');
        $("body").on("click", function() {
          if (polygon != null) {
            polygon.setMap(null)
          }
        })
        $("#conv_name_field").val("")
        $("#conv_name_field").on("keydown", function(e) {
          if (e.keyCode == 13) {
            chat_name = $("#conv_name_field").val()
            $('#cname_modal').modal('hide');
            $.ajax({
              url: "chatrooms/create",
              type: "POST",
              dataType:"script",
              data: {users: user_ids, name: chat_name, coords: positions}
            });
            fadeOutPolygon(polygon)
          }
        })
      }
      else {
        $.ajax({
          url: "chatrooms/show_chatroom_given_users",
          type: "GET",
          dataType: "script",
          data: {users: user_ids}
        })
        fadeOutPolygon(polygon)
      }
    }
  })
}

//CLICK SIDE BAR CHAT
function chatbox_chat_clicked(el) {
  chat_wrapper_active($("#chat_wrapper1"))
  id = Number($(el).attr("id").substring(4,))
  if (chatroom_already_opened(id)) {
    if (!chat_window_opened(id)) {
      open_chat($("#messages_container_" + id))
    }
    $("#message_field_" + id).focus()
  }
  else {
    $.ajax({
      url: "chatrooms/show",
      type: "GET",
      dataType: "script",
      data: {chat_id: id}
    })
  }
}

// "chat_wrapper3" => 3
function chatwrap_to_idnum(chatwrap) {
  return Number(chatwrap.attr('id').substr(-1))
}

function idnum_to_chatwrap(idnum) {
  return $("#chat_wrapper" + idnum)
}

function chat_window_opened(id) {
  wdw = $("#messages_container_" + id).parents().eq(1)
  if (wdw.css("visibility") == "visible") {
    return true
  }
  return false
}

// IS THE CHAT WINDOW DISPLAYED (OPEN OR CLOSED DOESNT MATTER)
function chatroom_already_opened(id) {
  if ($("#messages_container_" + id).length == 0) {
    return false
  }
  return true
}

//CLICK OPEN SIDEBAR
function open_all_chats() {
  $("#all_chat_btn").css("visibility", "hidden")
  $("#all_chats_box").css("visibility", "visible")
}

//CLICK CLOSE SIDE BAR
function toggle_all_chats() {
  $("#all_chats_box").css("visibility", "hidden")
  $("#all_chat_btn").css("visibility", "visible")
}

//CLICK TOGGLE IN CHAT WINDOW
function toggle_chat(el) {
  wrapper = $(el).parents().eq(2)
  btm_pnl = $(el).parents().eq(2).children().first()
  wrapper.css("visibility", "hidden")
  btm_pnl.css("visibility", "visible")

  for (var i = chatwrap_to_idnum(wrapper) + 1; i <= num_open_chats; i++) {
    idnum_to_chatwrap(i).css("left", "-=50")
  }
}

//CLICK BOTTOM HIDDEN CHAT
function open_chat(el) {
  wrapper = $(el).parents().eq(1)
  wrapper.css("visibility", "visible")
  for (var i = chatwrap_to_idnum(wrapper) + 1; i <= num_open_chats; i++) {
    idnum_to_chatwrap(i).css("left", "+=50")
  }
}

//CLICK CLOSE IN CHAT WINDOW
function close_chat(el) {
  position = chatwrap_to_idnum($(el))
  open_wdw_visibility = $(el).children().eq(1).css("visibility")
  $(el).empty()
  $(el).css("visibility", "hidden")

  for (var i = position + 1; i <= num_open_chats; i++) {
    slide_chat(i - 1, i, open_wdw_visibility)
  }
  num_open_chats -= 1
}

function append_to_end(wrapper) {
  px_pos = get_pixel_position(wrapper)
  wrapper.css({left: px_pos})
}

// MOVE THE CONTENT OF #(chat_wrapper<idx_from>) to #(chat_wrapper<idx_to>)
function slide_chat(idx_to, idx_from, open_wdw_visibility) {
  src = $("#chat_wrapper" + idx_from)
  dest = $("#chat_wrapper" + idx_to)


  dest.empty()
  dest.append(src.html())
  dest.css("visibility", src.css("visibility"))
  src.empty()
  src.css("visibility", "hidden")

  px_pos = get_pixel_position(dest)
  dest.css({left: px_pos})
}

function get_pixel_position(wrapper) {
  num_left_open = open_wrappers_to_left(wrapper)
  num_left_closed = chatwrap_to_idnum(wrapper) - 1 - num_left_open
  num_left = chatwrap_to_idnum(wrapper)
  px_pos = 200 + (num_left_open * 200) + (num_left_open * 20) + (num_left_closed * 150) + (num_left_closed * 20)
  return px_pos
}

function go_to_user(id) {
  $.ajax({
    url: "users/get_user_location",
    type: "GET",
    data: {id: id},
    dataType:"json",
    success: function(loc) {
      map.setZoom(14)
      map.panTo({lat: loc.lat, lng: loc.long})
    }
  });
}

function locate_chatroom_on_map(chatroom_id) {
  $.ajax({
    url: "chatrooms/get_coordinates",
    type: "GET",
    data: {id: chatroom_id},
    dataType:"json",
    success: function(poly_coords) {
      var coords = []
      for (var i = 0; i < poly_coords.length; i++) {
        coord = {lat: poly_coords[i].latitude, lng: poly_coords[i].longitude}
        coords.push(coord)
      }
      if (coords.length == 1) {
        map.panTo({lat: coords[0].lat, lng: coords[0].lng})
        map.setZoom(11)
        return
      }

      var polygon = new google.maps.Polygon({
          path: coords,
          strokeColor: 'black',
          strokeOpacity: 1.0,
          fillOpacity: 0.0
        });
      polygon.setMap(map);


      var bounds = new google.maps.LatLngBounds()
      for (var i = 0; i < coords.length; i++) {
        bounds.extend(coords[i]);
      }
      map.fitBounds(bounds)
      fadeOutPolygon(polygon)
    }
  })
}

function fadeOutPolygon(polygon) {
  if (polygon == null) {
    return
  }
  var fadeout = setInterval(function() {
    var stroke = polygon.strokeOpacity/30
    if (polygon.strokeOpacity <= 0) {
      clearInterval(fadeout)
      polygon.setVisible(false);
    }
    else {
      polygon.setOptions({
        'strokeOpacity': Math.max(0, polygon.strokeOpacity-stroke)
      })
    }
  }, 50)
}

function chat_wrapper_active(chat_wrapper_element) {
  if (chat_wrapper_element.html() == "") {
    return false
  }
  return true
}

function num_open_chat_windows() {
  count = 0
  for (var i = 1; i <= 5; i++) {
    if ($("#chat_wrapper" + i).html() != "") {
      if ($("#chat_wrapper" + i).children().eq(1).css("visibility") == "visible") {
        count++
      }
    }
  }
  return count
}

//number of open chats to the right of current
function open_wrappers_to_right(wrapper) {
  count = 0
  curr = chatwrap_to_idnum(wrapper)
  for (var i = curr + 1; i <= num_open_chats; i++) {
    if (idnum_to_chatwrap(i).children().eq(1).css("visibility") == "visible") {
      count++
    }
  }
  return count
}

function open_wrappers_to_left(wrapper) {
  count = 0
  curr = chatwrap_to_idnum(wrapper)
  for (var i = curr - 1; i >= 1; i--) {
    if (idnum_to_chatwrap(i).children().eq(1).css("visibility") == "visible") {
      count++
    }
  }
  return count
}
