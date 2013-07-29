require "rspec"
require "rack/test"
require "./app"

RSpec.configure do |conf|
  conf.include Rack::Test::Methods

  # Use color in STDOUT
  conf.color_enabled = true

  # Use color not only in STDOUT but also in pagers and files
  conf.tty = true

  # Use the specified formatter
  conf.formatter = :documentation # :progress, :html, :textmate

  # Clean db
  conf.after(:each) do
    Mongoid.default_session.collections.each { |coll| coll.drop unless /^system/.match(coll.name) }
  end
end