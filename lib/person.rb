require "csv"
require "data_mapper"

class Person
  include DataMapper::Resource
  property :id, Serial
  property :name, String
  property :picture, String
  property :gender, Enum[:male, :female]

  def self.from_csv gender, name, id, link
    person = Person.new
    person.name = name
    person.picture = link
    person.gender = gender.to_sym
    return person
  end

  def self.all_csv(csv_file)
    people = []
    CSV.foreach(csv_file) { |row| people << Person.from_csv(*row) }
    return people
  end

end
