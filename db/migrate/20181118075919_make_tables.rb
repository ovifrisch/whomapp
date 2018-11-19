class MakeTables < ActiveRecord::Migration[5.2]
  def change
    create_table :chatrooms do |t|
      t.string :name
      t.timestamps
    end

    create_table :chatroom_users do |t|
      t.references :chatroom, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end

    create_table :messages do |t|
      t.references :chatroom, foreign_key: true
      t.references :user, foreign_key: true
      t.text :body

      t.timestamps
    end
  end
end
