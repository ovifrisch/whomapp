Rails.application.routes.draw do
  resources :chatrooms
  root 'pages#home'
  get 'signup', to: 'users#new'
  post 'users/update_current_user_location', to: 'users#update_current_user_location'
  post 'chatrooms/create_chatroom', to: 'chatrooms#create_chatroom'
  get 'users/get_user_locations', to: 'users#get_user_locations'
  get 'users/get_current_user', to: 'users#get_current_user'
  resources :users, except: [:new]


  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end
