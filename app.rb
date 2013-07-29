require "json"
require "sinatra"
require "sinatra/json"
require "mongoid"
require "mime-types"

require "./lib/person"
require "./lib/office"

configure :test, :development do
  set :public_folder, "public/app"
  Mongoid.load!('./config/mongoid.yml')
end

configure :production do
  set :public_folder, "public/dist"
  Mongoid.load!('./config/mongoid.yml')
end

helpers do
  def parsed_body
    ::MultiJson.decode(request.body)
  end
end

get "/" do
	send_file File.expand_path('index.html', settings.public_folder)
end

get "/environment" do
	json ENV.to_json
end

get "/api/thoughtworkers.json" do
	json Person.all.to_json
end


# OFFICES
get "/api/offices" do
	json Office.without(:people).all
end

get "/api/offices/:office_slug" do |office_slug|
	json Office.find_by(slug: office_slug)
end

post "/api/offices" do
	@office = Office.create(parsed_body)
	@office.slug = @office.name
	@office.save!
	json @office
end

delete "/api/offices/:office_id" do | office_slug |
	json Office.where(slug: office_slug).delete
end


# PEOPLE
before "/api/offices/:office_slug/people" do |office_slug|
	@office = Office.find_by(slug: office_slug);
end

post "/api/offices/:office_slug/people" do |office_slug|
	@person = @office.people.create( parsed_body )
	@person.save!
	json @person
end

put "/api/offices/:office_slug/people" do |office_slug|
	@person = Person.where( parsed_body )
	puts "updating #{@person.to_json} with #{request.body.to_json}"
	@person.update_attributes!( parsed_body )
	json @person
end

delete "/api/offices/:office/people" do
	@person = @office.people.where(parsed_body).first;
	@person.delete
	json @person
end
