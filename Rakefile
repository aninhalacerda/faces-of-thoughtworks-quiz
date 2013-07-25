require 'rubygems'
require 'bundler/setup'
require 'rspec/core/rake_task'

desc "run sinatra app locally"
task :run => "Gemfile.lock" do
  sh "shotgun app.rb"
end

desc "run specs"
RSpec::Core::RakeTask.new(:spec)


task :test => :spec
task :default => :run