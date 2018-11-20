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
    user_ids = get_all_members(params[:users].map(&:to_i))

    if (!valid_chatroom(user_ids))
      return
    end

    # CREATE THE CHATROOM
    @chatroom = Chatroom.new()
    @chatroom.initiator = current_user
    @chatroom.save

    # ADD EACH USER TO IT
    user_ids.each do |user_id|
      chatroom_user = ChatroomUser.new()
      chatroom_user.user = User.find(user_id)
      chatroom_user.chatroom = @chatroom
      chatroom_user.save
    end

    @messages = @chatroom.messages.order(created_at: :desc).limit(100).reverse
    @dest_user = destination_user(@chatroom)


    NewConversationRelayJob.perform_later(@chatroom)
    #goes to views/chatrooms/create.js.erb
  end

  def add_chatbox_chat
    @chatroom = Chatroom.find(params[:chatroom_id].to_i)
  end

  private

    def get_all_members(users)
      if (users.include? current_user.id)
        users
      else
        users.unshift(current_user.id)
      end
    end


    def valid_chatroom(user_ids)
      # NO CHAT WITH SELF
      if (user_ids.length == 1 && user_ids[0] == current_user.id)
        return false
      # NO EXISTING CHAT
      elsif (chat_exists(user_ids))
        return false
      else
        return true
      end
    end

    # returns the user that is on the other side of the line
    def destination_user(chatroom)
      if (current_user.id == chatroom.users[0].id)
        chatroom.users[1]
      else
        chatroom.users[0]
      end
    end

    def chat_exists(new_users)
      sorted_new_users = new_users.sort
      User.find(current_user.id).chatrooms.each do |chatroom|
        if (sorted_new_users == chatroom.users.pluck(:id).sort)
          return true
        end
      end
      return false
    end
end
