console.log("yooo")
App.users = App.cable.subscriptions.create({channel: "UsersChannel"}, {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("connected");
  },
  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("disconnected");
  },
  received(data) {
    // create a subscription to this chatroom

    // if this is initiator, display the chat window
  }
})
