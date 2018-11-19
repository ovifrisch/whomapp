class ChatroomsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @chatrooms = Chatroom.all
  end


  def show
    @chatroom = Chatroom.find(params[:chat_id])
    @dest_user = destination_user(@chatroom)
    @messages = @chatroom.messages.order(created_at: :desc).limit(100).reverse
  end


  def destroy
    @chatroom.destroy
    respond_to do |format|
      format.html { redirect_to chatrooms_url, notice: 'Chatroom was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def create
    # prevent chatroom with yourself:
    if (current_user.id == params[:user].to_i)
      return
    end

    # prevent existing chat
    new_users = [current_user.id, params[:user].to_i]
    if (chat_already_exists(new_users))
      return
    end

    @chatroom = Chatroom.new()
    @cru1 = ChatroomUser.new()
    @cru1.user = current_user
    @cru1.chatroom = @chatroom
    @cru2 = ChatroomUser.new()
    @cru2.user = User.find(params[:user])
    @cru2.chatroom = @chatroom
    @chatroom.initiator = current_user
    @chatroom.save
    @cru1.save
    @cru2.save
    @messages = @chatroom.messages.order(created_at: :desc).limit(100).reverse
    @dest_user = destination_user(@chatroom)


    NewConversationRelayJob.perform_later(@chatroom)
    #goes to views/chatrooms/create_chatrooms.js.erb
  end

  def add_chatbox_chat
    @chatroom = Chatroom.find(params[:chatroom_id])
  end

  private

    # returns the user that is on the other side of the line
    def destination_user(chatroom)
      if (current_user.id == chatroom.users[0].id)
        chatroom.users[1]
      else
        chatroom.users[0]
      end
    end

    # true if the new chatroom already exists
    def chat_already_exists(new_users)
      sorted_new_users = new_users.sort
      User.find(current_user.id).chatrooms.each do |chatroom|
        if (sorted_new_users == chatroom.users.pluck(:id).sort)
          return true
        end
      end
      return false
    end
end
