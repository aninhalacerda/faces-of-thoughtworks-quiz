require "rspec"
require "rack/test"

require_relative "../app"

RSpec.configure do |conf|
  conf.include Rack::Test::Methods

  # Use color in STDOUT
  conf.color_enabled = true

  # Use color not only in STDOUT but also in pagers and files
  conf.tty = true

  # Use the specified formatter
  conf.formatter = :documentation # :progress, :html, :textmate
end


set :environment, :test