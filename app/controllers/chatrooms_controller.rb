class ChatroomsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_chatroom, only: [:show, :edit, :update, :destroy]

  # GET /chatrooms
  # GET /chatrooms.json
  def index
    @chatrooms = Chatroom.all
  end

  # GET /chatrooms/1
  # GET /chatrooms/1.json
  def show
  end

  # GET /chatrooms/new
  def new
    @chatroom = Chatroom.new
  end

  # GET /chatrooms/1/edit
  def edit
  end

  # POST /chatrooms
  # POST /chatrooms.json
  def create
    @chatroom = Chatroom.new(chatroom_params)

    respond_to do |format|
      if @chatroom.save
        format.html { redirect_to @chatroom, notice: 'Chatroom was successfully created.' }
        format.json { render :show, status: :created, location: @chatroom }
      else
        format.html { render :new }
        format.json { render json: @chatroom.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /chatrooms/1
  # PATCH/PUT /chatrooms/1.json
  def update
    respond_to do |format|
      if @chatroom.update(chatroom_params)
        format.html { redirect_to @chatroom, notice: 'Chatroom was successfully updated.' }
        format.json { render :show, status: :ok, location: @chatroom }
      else
        format.html { render :edit }
        format.json { render json: @chatroom.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /chatrooms/1
  # DELETE /chatrooms/1.json
  def destroy
    @chatroom.destroy
    respond_to do |format|
      format.html { redirect_to chatrooms_url, notice: 'Chatroom was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def create_chatroom
    # restrict the chatrooms u can create. like cant create the same one again

    @chatroom = Chatroom.new()

    @cru1 = ChatroomUser.new()
    @cru1.user = current_user
    @cru1.chatroom = @chatroom

    @cru2 = ChatroomUser.new()
    @cru2.user = User.find(params[:user])
    @cru2.chatroom = @chatroom

    @chatroom.save
    @cru1.save
    @cru2.save

    @messages = @chatroom.messages.order(created_at: :desc).limit(100).reverse

    #goes to views/chatrooms/create_chatrooms.js.erb
  end

  def show_chat_window
    @chatroom = Chatroom.find(params[:chat_id])
    @messages = @chatroom.messages.order(created_at: :desc).limit(100).reverse
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chatroom
      @chatroom = Chatroom.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def chatroom_params
      params.require(:chatroom).permit(:name)
    end
end
