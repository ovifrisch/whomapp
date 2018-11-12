class DropTables < ActiveRecord::Migration[5.2]
  def change
    drop_table :conversations
    drop_table :messages
    drop_table :conversations_users
  end
end
