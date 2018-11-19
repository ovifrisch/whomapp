class UsersController < ApplicationController

  before_action :authenticate_user!

  skip_before_action :verify_authenticity_token

  def show

  end

  def index
    @user = current_user
    @users = User.all
    @user_chatrooms = @user.chatrooms
  end

  def update_current_user_location

    current_user.longitude = params[:longitude]
    current_user.latitude = params[:latitude]
    current_user.save

    respond_to do |format|
      format.json { render :json => {:message => "success"} }
    end
  end

  def get_user_locations
    locations = User.select(:id, :longitude, :latitude)

    respond_to do |format|
      format.json { render json: locations }
    end
  end

  def get_current_user
    respond_to do |format|
      format.json { render json: current_user.id }
    end
  end

  def get_user_location
    user = User.find(params[:id])
    location = {long:user.longitude, lat:user.latitude}

    respond_to do |format|
      format.json {render json: location}
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

  def destination_user(chatroom)
    if (current_user.id = chatroom.users[0].id)
      chatroom.users[1]
    else
      chatroom.users[0]
    end
  end
end
