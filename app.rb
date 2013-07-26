require "sinatra"
require "json"
require "./lib/person"

get "/" do
	person = Person.all_csv(File.join(settings.root, "resources/peeps.csv"));
	person.to_json
end