require 'addressable/uri'

class Feed
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  include Mongoid::Timestamps::Updated

  has_many :entries

  # run 'rake db:mongoid:create_indexes' to create indexes
  index({ permalink: 1 }, { unique: true, background: true })
  index({ keywords: "text", description: "text" }, { default_language: "english", language_override: "english" })

  # Identifier
  field :permalink, type: String
  field :url, type: String

  # Listing
  field :title, type: String
  field :description, type: String
  field :image, type: String

  # Properties
  field :author, type: String
  field :language, type: String
  field :keywords, type: Array

  # Meta
  field :has_og_tags, type: Boolean

  def self.normalize_url(url)
    Addressable::URI.parse(url.gsub('https://', 'http://')).normalize if url
  end

end
