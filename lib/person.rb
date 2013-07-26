require "csv"
require "mongoid"

class Person
  include Mongoid::Document
  field :name, :type => String
  field :picture, :type => String
  field :gender, :type => Symbol

  def self.from_csv gender, name, id, link
    person = Person.new
    person.name = name
    person.gender = gender.to_sym
    person.picture = link
    return person
  end

  def self.all_csv(csv_file)
    people = []
    CSV.foreach(csv_file) { |row| people << Person.from_csv(*row) }
    return people
  end

end
