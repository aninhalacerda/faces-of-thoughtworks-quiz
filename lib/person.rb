require 'csv'

class Person
	attr_reader :gender, :name, :id, :picture

	def initialize(gender, name, id, picture)
		@gender = gender;
		@name = name;
		@id = id;
		@picture = picture;
	end


	# def self.all_from_csv(csv_file)
	# 	people = []
	# 	CSV.foreach(csv_file) do |row|
 #      people << Person.new(*row)
 #    end
 #    people;
	# end

end