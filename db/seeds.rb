# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  {email: "daniel@gmail.com", username: "daniel", password: "password", longitude: -117.081839, latitude: 32.724601},
  {email: "alina@gmail.com", username: "alina", password: "password", longitude: -122.438625, latitude: 37.464643},
  {email: "neel@gmail.com", username: "neel", password: "password", longitude: -122.170899, latitude: 37.423640},
  {email: "minu@gmail.com", username: "minu", password: "password", longitude: -121.744046, latitude: 38.552309},
  {email: "derek@gmail.com", username: "derek", password: "password", longitude: -117.826331, latitude: 33.675120},
  {email: "alabama@gmail.com", username: "alabama", password: "password", longitude: -86.791130, latitude: 32.806671},
  {email: "alaska@gmail.com", username: "alaska", password: "password", longitude: -152.404419, latitude: 61.370716},
  {email: "arizona@gmail.com", username: "arizona", password: "password", longitude: 	-111.431221, latitude: 33.729759	},
  {email: "arkansas@gmail.com", username: "arkansas", password: "password", longitude: -92.373123, latitude: 34.969704},
  {email: "california@gmail.com", username: "california", password: "password", longitude: -119.681564, latitude:36.116203},
  {email: "colorado@gmail.com", username: "colorado", password: "password", longitude: -105.311104, latitude: 39.059811},
  {email: "Connecticut@gmail.com", username: "Connecticut", password: "password", longitude: -72.755371, latitude: 	41.597782},
  {email: "Delaware@gmail.com", username: "Delaware", password: "password", longitude: -75.507141, latitude: 39.318523},
  {email: "Florida@gmail.com", username: "Florida", password: "password", longitude: -81.686783, latitude: 27.766279},
  {email: "Georgia@gmail.com", username: "Georgia", password: "password", longitude: 	-83.643074, latitude: 33.040619},
  {email: "Hawaii@gmail.com", username: "Hawaii", password: "password", longitude: -157.498337, latitude: 21.094318},
  {email: "Idaho@gmail.com", username: "Idaho", password: "password", longitude: 	-114.478828, latitude: 44.240459},
  {email: "israel@gmail.com", username: "israel", password: "password", longitude: 	30.806433, latitude: 34.926115}
  ])
