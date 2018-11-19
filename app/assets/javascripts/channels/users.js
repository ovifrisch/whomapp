App.users = App.cable.subscriptions.create({channel: "NewConversationNotificationChannel"}, {
  connected() {
    // Called when the subscription is ready for use on the server
  },
  disconnected() {
    // Called when the subscription has been terminated by the server
  },
  received(data) {
    App.chatrooms = App.cable.subscriptions.create({channel: "ChatroomsChannel", room: "chatrooms:" + data.chatroom_id}, {
      connected() {
        // Called when the subscription is ready for use on the server
      },
      disconnected() {
        // Called when the subscription has been terminated by the server
      },
      received(data) {
        received_logic(data)
      }
    });
  }
})
