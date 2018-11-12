class ConversationsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create_conversation
    end_user = params[:user]
    ConversationUser.new()
    byebug
  end
end
