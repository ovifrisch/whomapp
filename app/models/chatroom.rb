class Chatroom < ApplicationRecord
  has_many :chatroom_users
  has_many :users, through: :chatroom_users
  has_many :messages
  has_many :coordinates
  belongs_to :initiator, class_name: "User"
end
