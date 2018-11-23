class AddCoordinates < ActiveRecord::Migration[5.2]
  def change
    create_table :coordinates do |t|
      t.decimal :latitude
      t.decimal :longitude
      t.integer :position
      t.references :chatroom
    end
  end
end
