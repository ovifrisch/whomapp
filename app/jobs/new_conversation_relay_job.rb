class NewConversationRelayJob < ApplicationJob
  queue_as :default

  def perform(chatroom)
    chatroom.users.each do |user|
      ActionCable.server.broadcast "users:#{user.id}", {
        chatroom: chatroom
      }
    end
  end
end
