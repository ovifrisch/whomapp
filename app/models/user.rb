class User < ApplicationRecord
  has_many :chatroom_users
  has_many :chatrooms, through: :chatroom_users
  has_many :messages

  validates :username, presence: true, uniqueness: {case_sensitive: false},
  length: {minimum: 3, maximum: 25}

  has_secure_password

end
