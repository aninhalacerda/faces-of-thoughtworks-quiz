require 'spec_helper.rb'

describe Person do
	describe "#new" do
		subject { person }

		context "with gender, name, id, picture" do
			let(:person){ Person.new('f', 'Person With Name', 1, '1.jpg') }
			# it{ subject.gender.should eq 'f' }
			# it{ subject.name.should eq 'Person With Name' }
			# it{ subject.id.should eq 1 }
			# it{ subject.picture.should eq '1.jpg' }
		end

		context "whithout name" do
			let(:person){ Person.new }
			it{ should be_nil }
		end

	end
end