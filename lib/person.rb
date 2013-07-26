require "csv"
require "data_mapper"

class Person
  include DataMapper::Resource
  property :id, Serial
  property :name, String
  property :link, String
  property :gender, Enum[:male, :female]

  def self.from_csv gender, name, id, link
    @gender, @name, @id, @link = gender.to_sym, name, id.to_i, link
  end

  def self.all_csv(csv_file)
    people = []
    CSV.foreach(csv_file) { |row| people << Person.from_csv(*row) }
    return people
  end

end
