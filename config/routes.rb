Rails.application.routes.draw do
  #  https://stackoverflow.com/questions/3546289/override-devise-registrations-controller
  #  https://stackoverflow.com/questions/13836139/rails-how-to-override-devise-sessionscontroller-to-perform-specific-tasks-when

  mount ActionCable.server => "/cable"

  devise_for :users
  # devise_for :users, :controllers => {:registrations => "registrations", :sessions => "sessions"}

  resources :chatrooms do
    resources :messages
  end
  root 'pages#home'

  post 'users/update_current_user_location', to: 'users#update_current_user_location'
  post 'chatrooms/create', to: 'chatrooms#create'

  get 'chatrooms/add_chatbox_chat', to: 'chatrooms#add_chatbox_chat'
  get 'chatrooms/show_new_message_notification', to: 'chatrooms#show_new_message_notification'

  get 'users/get_user_locations', to: 'users#get_user_locations'
  get 'users/get_current_user', to: 'users#get_current_user'
  get 'users/get_user_location', to: 'users#get_user_location'
  resources :users, except: [:new]
end
