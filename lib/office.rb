require "csv"
require "mongoid"

class Office
  include Mongoid::Document
  field :name, :type => String
  field :slug, :type => String
  field :flag, :type => String

  validates_presence_of :name, :slug
  embeds_many :people

end
