class ReferenceForCoord < ActiveRecord::Migration[5.2]
  def change
    change_table :coordinates do |t|
      t.references :chatroom, index = true
    end
  end
end
