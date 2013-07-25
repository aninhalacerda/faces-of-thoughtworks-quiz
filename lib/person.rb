require 'csv'

class Person
	attr_reader :gender, :name, :id, :picture

	def initialize(args={})
		@gender = args[:gender];
		@name = args[:name];
		@id = args[:id];
		@picture = args[:picture];
	end

end