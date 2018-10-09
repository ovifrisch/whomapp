Rails.application.routes.draw do
  root 'pages#home'
  get 'signup', to: 'users#new'
  post 'users/update_current_user_location', to: 'users#update_current_user_location'
  get 'users/get_user_locations', to: 'users#get_user_locations'
  get 'users/get_current_user', to: 'users#get_current_user'
  resources :users, except: [:new]


  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end
