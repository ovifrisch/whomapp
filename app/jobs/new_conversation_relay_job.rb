class NewConversationRelayJob < ApplicationJob
  queue_as :default

  def perform(chatroom)
    chatroom.users.each do |user|
      ActionCable.server.broadcast "users_convo_notif:#{user.id}", {
        chatroom_id: chatroom.id
      }
    end
  end
end
