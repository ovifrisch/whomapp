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
	received_logic(data)
  }
});

function received_logic(data) {
  chat_window = $("#messages_container_" + data.chatroom_id)
  chatbox = $("#all_chats_box")
  chatbox_chat = $("#chat" + data.chatroom_id)

  // CHAT WINDOW OPEN, SO APPENDss
  if (chat_window.length > 0) {
	chat_window.append(data.message)
	chat_window.scrollTop(chat_window.prop("scrollHeight"));
  }

  // NO CHATBOX_CHAT, SO APPEND
  if (chatbox_chat.length == 0) {
	$.ajax({
	  url: "chatrooms/add_chatbox_chat",
	  type: "GET",
	  dataType: "script",
	  data: {chatroom_id: data.chatroom_id}
	})
  }
}
