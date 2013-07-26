require "sinatra"
require "json"
require "./lib/person"


configure :test, :development do
  enable :logging
  set :public_folder, 'public/app'
end

configure :production do
  set :public_folder, 'public/dist'
end

get "/" do
  send_file File.join(settings.public_folder, 'index.html')
end

get "/api/thoughtworkers.json" do
	Person.all_csv(File.join(settings.root, "resources/peeps.csv")).to_json
end