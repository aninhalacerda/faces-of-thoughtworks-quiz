require "rubygems"
require "bundler/setup"
require "rspec/core/rake_task"
RSpec::Core::RakeTask.new(:spec)


namespace :run do
	desc "run app development"
	task :dev => "Gemfile.lock" do
	  sh "bundle exec shotgun app.rb -E development"
	end

	desc "run app test"
	task :test => "Gemfile.lock" do
	  sh "bundle exec shotgun app.rb -E test"
	end

	desc "run app production"
	task :production => "Gemfile.lock" do
	  sh "bundle exec rackup app.rb -E production"
	end
end

namespace :db do
	desc "seed_poa players"
	task :seed_poa, :env do |t, args|
		ENV['RACK_ENV'] ||= args[:env] || 'development'
		require "./app"
		Person.all_csv(File.join("resources", "peeps.csv")).each do |person|
			puts "Saving #{person.name}"
			person.save!
		end
	end

	desc "clean db"
	task :clean, :env do |t, args|
		ENV['RACK_ENV'] ||= args[:env] || 'development'
		require "./app"
		Mongoid.default_session.collections.each { |coll| coll.drop unless /^system/.match(coll.name) }
	end
end

task :test => :spec
task :default => :run

