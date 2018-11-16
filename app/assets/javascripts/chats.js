const max_open_chats = 5
var num_open_chats = 0


// CLICK USER ON MAP
function create_conversation(user_id) {
  $.ajax({
    url: "chatrooms/create_chatroom",
    type: "POST",
    dataType:"script",
    data: {user: user_id}
  });
}

//CLICK OPEN SIDEBAR
function open_all_chats() {
  $("#all_chat_btn").css("display", "none");
  $("#all_chats_box").css("display", "block");
}

//CLICK CLOSE SIDE BAR
function toggle_all_chats() {
  $("#all_chats_box").css("display", "none");
  $("#all_chat_btn").css("display", "block");
}

//CLICK BOTTOM HIDDEN CHAT
function openChat(el) {
  $(el).parents().eq(0).css("display", "none");
  $(el).parents().eq(1).children().eq(1).css("display", "block");
}

//CLICK SIDE BAR CHAT
function chatbox_chat_clicked(el) {
  id = Number($(el).attr("id").substring(4,));

  $.ajax({
    url: "chatrooms/show_chat_window",
    type: "POST",
    dataType: "script",
    data: {chat_id: id}
  })
}

//CLICK CLOSE IN CHAT WINDOW
function close_chat(el) {
  position = Number($(el).attr("id").substr(-1))
  $(el).empty()
  for (var i = position + 1; i <= num_open_chats; i++) {
    slide_chat(i, i - 1);
  }
  num_open_chats -= 1
}

//CLICK TOGGLE IN CHAT WINDOW
function toggle_chat(el) {
  $(el).parents().eq(1).css("display", "none");
  $(el).parents().eq(2).children().first().css("display", "block");
}

// MOVE THE CONTENT OF #(chat_wrapper<idx_from>) to #(chat_wrapper<idx_to>)
function slide_chat(idx_from, idx_to) {
  src = "chat_wrapper" + idx_from
  dest = "chat_wrapper" + idx_to

  $('#' + dest).empty()
  $('#' + dest).append($('#' + src).html())
  $('#' + src).empty()


}
