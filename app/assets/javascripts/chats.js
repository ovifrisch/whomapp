function create_conversation(user_id) {
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
