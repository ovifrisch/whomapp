class RemoveCoord < ActiveRecord::Migration[5.2]
  def change
    drop_table :coordinates
  end
end
