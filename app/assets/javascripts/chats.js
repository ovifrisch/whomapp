

function create_conversation(user_id) {
  $.ajax({
    url: "chatrooms/create_chatroom",
    type: "POST",
    dataType:"script",
    data: {user: user_id}
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

function openChat(element) {
  element.style.display = "none";
  document.getElementById("one_chat_open1").style.display = "block";
}

function chatbox_chat_clicked(chat_macro) {
  chat_id = Number(chat_macro.id.substring(4,));
  console.log(chat_id)

  $.ajax({
    url: "chatrooms/show_chat_window",
    type: "POST",
    dataType: "script",
    data: {chat_id: chat_id}
  })
}

function close_chat(element) {
  root = element.parentElement.parentElement;
  // element.parentElement.parentElement.style.display = "none";
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.style.display = "none";
}

function toggle_chat(element) {
  //this is temporary.

  root = element.parentElement.parentElement;
  root.style.display = "none";
  document.getElementById("collapse_chat_btn1").style.display = "block";
}
