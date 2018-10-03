class User < ApplicationRecord
  validates :username, presence: true, uniquness: {case_sensitive: false},
  length: {minimum: 3, maximum: 25}


end
