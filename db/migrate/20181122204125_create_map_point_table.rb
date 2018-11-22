class CreateMapPointTable < ActiveRecord::Migration[5.2]
  def change
    create_table :coordinates do |t|
      t.float :latitude
      t.float :longitude
      t.integer :position
    end
  end
end
