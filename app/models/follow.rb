class Follow
  include Mongoid::Document

  belongs_to :user
  belongs_to :feed

  field :listened, type: Integer, default: 0
end

