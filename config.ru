# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

Rails.application.eager_load!
require 'action_cable/process/logging'

run Rails.application
