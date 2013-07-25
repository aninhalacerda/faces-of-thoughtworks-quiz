require 'simplecov'
require 'coveralls'

SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter[
  SimpleCov::Formatter::HTMLFormatter,
  Coveralls::SimpleCov::Formatter
]
SimpleCov.start do
	add_filter "vendor"
end

require "rspec"
require "webmock/rspec"
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


# def a_delete(path)
#   a_request(:delete, Twitter::Default::ENDPOINT + path)
# end

# def a_get(path)
#   a_request(:get, Twitter::Default::ENDPOINT + path)
# end

# def a_post(path)
#   a_request(:post, Twitter::Default::ENDPOINT + path)
# end

# def a_put(path)
#   a_request(:put, Twitter::Default::ENDPOINT + path)
# end

# def stub_delete(path)
#   stub_request(:delete, Twitter::Default::ENDPOINT + path)
# end

# def stub_get(path)
#   stub_request(:get, Twitter::Default::ENDPOINT + path)
# end

# def stub_post(path)
#   stub_request(:post, Twitter::Default::ENDPOINT + path)
# end

# def stub_put(path)
#   stub_request(:put, Twitter::Default::ENDPOINT + path)
# end

# def fixture_path
#   File.expand_path("../fixtures", __FILE__)
# end

# def fixture(file)
#   File.new(fixture_path + '/' + file)
# end