App.chatrooms = App.cable.subscriptions.create({channel: "ChatroomsChannel"}, {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("connected");
  },
  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("disconnected");
  },

  received(data) {
    active_chatroom = $("#messages_container_" + data.chatroom_id)
    active_chatbox_chat = $("#chat" + data.chatroom_id)
    console.log(active_chatroom.length, active_chatbox_chat.length)

    if (active_chatroom.length > 0) {
      active_chatroom.append(data.message)
    }

    //increment number of unread messages
    // show number of unread messages
    // add logic for when you click this chat to remove whatever change you make to it here
    else {
      $("#chat" + data.chatroom_id).css("font-weight", "bold")
    }


    // if (active_chatbox_chat == 0) {
    //   $("#chatbox_chat_wrap").append("<%= escape_javascript("#{render 'chatbox_chat', obj: Chatroom.find(data.chatroom_id)}").html_safe%>")
    // }
  }
});
