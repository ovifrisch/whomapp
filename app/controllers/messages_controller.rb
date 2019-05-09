class MessagesController < ApplicationController
  before_action :set_chatroom

  def create
	message = @chatroom.messages.new(message_params)
	message.user = current_user
	message.save
	NewMessageRelayJob.perform_later(message)

	respond_to do |format|
		format.js {render layout: false, content_type: 'text/javascript'}
	end
  end

  private

  def set_chatroom
	@chatroom = Chatroom.find(params[:chatroom_id])
  end

  def message_params
	params.require(:message).permit(:body)
  end



end
