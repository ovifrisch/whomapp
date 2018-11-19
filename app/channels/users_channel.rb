class NewConversationNotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "users_convo_notif:#{current_user.id}"
  end

  def unsubscribed
    stop_all_streams
  end
end
