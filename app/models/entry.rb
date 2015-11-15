class Entry
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  include Mongoid::Timestamps::Updated

  belongs_to :feed # , dependent: :destroy

  # run 'rake db:mongoid:create_indexes' to create indexes
  index({ permalink: 1 }, { unique: true, background: true })
  index({ keywords: "text", description: "text" }, { default_language: "english", language_override: "english" })

  field :permalink, type: String
  field :published, type: DateTime

  field :title, type: String
  field :description, type: String

  field :audio_url, type: String
  field :image, type: String
  field :duration, type: String

  field :keywords, type: Array

  validates_presence_of :feed_id
end
