var max_open_chats = 5
var num_open_chats = 0


// CLICK USER ON MAP OR CALLED AFTER POLYGON DRAWN (drawing.js)
function create_conversation(user_ids) {
  $('#exampleModal').modal('show');
  $("#conv_name_field").on("keydown", function(e) {
    if (e.keyCode == 13) {
      chat_name = $("#conv_name_field").val()
      $('#exampleModal').modal('hide');
      $.ajax({
        url: "chatrooms/create",
        type: "POST",
        dataType:"script",
        data: {users: user_ids, name: chat_name}
      });
    }
  })
}

//CLICK SIDE BAR CHAT
function chatbox_chat_clicked(el) {
  id = Number($(el).attr("id").substring(4,))

  $.ajax({
    url: "chatrooms/show",
    type: "GET",
    dataType: "script",
    data: {chat_id: id}
  })
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
}

//CLICK BOTTOM HIDDEN CHAT
function open_chat(el) {
  wrapper = $(el).parents().eq(1)
  wrapper.css("visibility", "visible")
}

//CLICK CLOSE IN CHAT WINDOW
function close_chat(el) {
  position = Number($(el).attr("id").substr(-1))
  $(el).empty()
  $(el).css("visibility", "hidden")

  for (var i = position + 1; i <= num_open_chats; i++) {
    slide_chat(i - 1, i)
  }
  num_open_chats -= 1
}

// MOVE THE CONTENT OF #(chat_wrapper<idx_from>) to #(chat_wrapper<idx_to>)
function slide_chat(idx_to, idx_from) {
  src = $("#chat_wrapper" + idx_from)
  dest = $("#chat_wrapper" + idx_to)

  dest.empty()
  dest.append(src.html())
  dest.css("visibility", src.css("visibility"))
  src.empty()
  src.css("visibility", "hidden")
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
