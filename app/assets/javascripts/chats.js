num_open_chats = 0
max_open_chats = 2

function increment_open_chats() {
  if (num_open_chats == max_open_chats) {
    return
  }
  else {
    num_open_chats += 1
  }
}

function create_conversation(user_id) {
  increment_open_chats()
  $.ajax({
    url: "chatrooms/create_chatroom",
    type: "POST",
    dataType:"json",
    data: {user: user_id},
    success: function(result) {
      window.location = result.location;
    }
  });
}

function open_all_chats() {
  document.getElementById("all_chat_btn").style.display = "none";

  document.getElementById("all_chats_box").style.display = "block";
}

function close_all_chats() {
  document.getElementById("all_chats_box").style.display = "none";
  document.getElementById("all_chat_btn").style.display = "block";
}

function openForm0() {

}

function openForm1() {
  document.getElementById("myForm").style.display = "block";
}

function openForm2() {

}
