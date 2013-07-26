require "json"
require "sinatra"
require "mongoid"

require "./lib/person"


configure :test, :development do
  set :public_folder, "public/app"
end

configure :production do
  set :public_folder, "public/dist"
end

Mongoid.load!('./config/mongoid.yml')

get "/" do
  send_file File.join(settings.public_folder, "index.html")
end

get "/environment" do
	ENV.to_json
end

get "/api/thoughtworkers.json" do
	Person.all.to_json
end
