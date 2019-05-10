Rails.application.routes.draw do
  #  https://stackoverflow.com/questions/3546289/override-devise-registrations-controller
  #  https://stackoverflow.com/questions/13836139/rails-how-to-override-devise-sessionscontroller-to-perform-specific-tasks-when

  mount ActionCable.server => "/cable"

  post 'users/update_current_user_location', to: 'users#update_current_user_location'
  post 'chatrooms/create', to: 'chatrooms#create'

  get 'chatrooms/add_chatbox_chat', to: 'chatrooms#add_chatbox_chat'
  get 'chatrooms/show_new_message_notification', to: 'chatrooms#show_new_message_notification'
  get 'chatrooms/validate_chatroom', to: "chatrooms#validate_chatroom"
  get 'chatrooms/show_chatroom_given_users', to: "chatrooms#show_chatroom_given_users"
  get 'chatrooms/get_coordinates', to: "chatrooms#get_coordinates"
  get 'chatrooms/filter_chatbox', to: "chatrooms#filter_chatbox"
  get 'chatrooms/get_more_messages', to: "chatrooms#get_more_messages"

  get 'users/get_user_locations', to: 'users#get_user_locations'
  get 'users/get_current_user', to: 'users#get_current_user'
  get 'users/get_user_location', to: 'users#get_user_location'
  get 'about', to: 'pages#about'
  get 'settings', to: 'pages#settings'
  get 'help', to: 'pages#help'

  devise_for :users
  # devise_for :users, :controllers => {:registrations => "registrations", :sessions => "sessions"}

  resources :chatrooms do
	resources :messages
  end
  root 'pages#home'
  resources :users, except: [:new]
end
