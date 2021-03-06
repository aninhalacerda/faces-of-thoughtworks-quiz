require 'csv'
require_relative 'person'

class Crowd
  @@people = nil

  def self.total
    load_data
    @@people.size
  end

  def self.random params
    @@people.select { |e| e if !params[:to_exclude].include?(e.id) }.sample
  end

  def self.get params
    gender, quantity = params[:gender], params[:quantity]
    same_gender_picks = @@people_by_gender[gender].reject { |e| e.id == params[:pick].id }
    same_gender_picks.sample quantity
  end

  def self.everyone
    load_data
    @@people
  end

  def self.find(peep_id)
    self.everyone.find { |p| p.id.to_s == peep_id.to_s }
  end

  private
  def self.load_data
    return if @@people
    @@people, @@people_by_gender = [], { :m => [],  :f => [] }
    CSV.foreach(File.join(__dir__, "../resources/peeps.csv")) do |row|
      person = Person.new(*row)
      @@people << person
      @@people_by_gender[person.gender] << person
    end
  end

end

