class ChatroomsChannel < ApplicationCable::Channel
  def subscribed
    if (params[:room] != nil)
      stream_from params[:room]
    else
      current_user.chatrooms.each do |chatroom|
        stream_from "chatrooms:#{chatroom.id}"
      end
    end
  end

  def unsubscribed
    stop_all_streams
  end
end
