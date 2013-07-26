require "rubygems"
require "bundler/setup"
require "rspec/core/rake_task"

desc "run dev"
task :run => "Gemfile.lock" do
  sh "bundle exec shotgun app.rb -E development"
end

desc "run specs"
task :spec => "Gemfile.lock" do
  sh "bundle exec rackup app.rb -E test"
end

desc "run prod"
task :spec => "Gemfile.lock" do
  sh "bundle exec thin app.rb -E production"
end

task :test => :spec
task :default => :run