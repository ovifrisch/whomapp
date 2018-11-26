class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  config.include Devise::Test::ControllerHelpers, type: :controller


  # def require_user
  #   if !logged_in?
  #     flash[:danger] = "You must be logged in to perform that action"
  #     redirect_to root_path
  #   end
  # end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end

  private

  def after_sign_in_path_for(resource)
    users_path
  end

  def after_sign_up_path_for(resource)
    users_path
  end
end
