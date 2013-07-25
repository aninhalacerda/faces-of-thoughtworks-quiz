require 'sinatra'
require 'person'

get '/' do
	return Person.new
end