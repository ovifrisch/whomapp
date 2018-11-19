class AddInitiatorToConversations < ActiveRecord::Migration[5.2]
  def change
    change_table :chatrooms do |t|
      t.references :initiator, index = true
    end
  end
end
