class RegistrationsController < Devise::RegistrationsController
  def new
    super
  end

  def create
    redirect_to root_path
  end

  def update
    super
  end
end
