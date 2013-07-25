require 'spec_helper.rb'

describe Person do
	describe "#new" do
		subject { person }

		context "with params" do
			let(:person){ Person.new({:gender => 'f', :name => 'Person With Name', :id => 1, :picture => '1.jpg'}) }
			it{ subject.gender.should eq 'f' }
			it{ subject.name.should eq 'Person With Name' }
			it{ subject.id.should eq 1 }
			it{ subject.picture.should eq '1.jpg' }
		end

		context "whithout params" do
			let(:person){ Person.new }
			it{ subject.gender.should be_nil }
			it{ subject.name.should be_nil }
			it{ subject.id.should be_nil }
			it{ subject.picture.should be_nil }
		end

		context "with csv row" do
		end
	end
end