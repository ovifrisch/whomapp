App.chatrooms = App.cable.subscriptions.create "ChatroomsChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    active_chatroom = $("#messages_container_#{data.chatroom_id}")
    console.log("printing")
    console.log(active_chatroom.length)
    $("#messages_container_#{data.chatroom_id}").append(data.message)
    # Called when there's incoming data on the websocket for this channel
