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
  field :published, type: Boolean, default: -> { false }

  # Meta
  field :has_og_tags, type: Boolean

  def self.normalize_url(url)
    Addressable::URI.parse(url.gsub('https://', 'http://')).normalize if url
  end

  def update_info(new_info)
    if !self.has_og_tags? &&
        new_info[:title] &&
        new_info[:description] &&
        new_info[:title] != new_info[:description]
      self.title = new_info.delete(:title)
      self.description = new_info.delete(:description)
    else
      # discard title / description / image
      # probably what we have is better than 'new_info'
      new_info.delete(:title) if self.title
      new_info.delete(:description) if self.description
      new_info.delete(:image) if self.image
    end

    # sanitize keywords
    new_info[:keywords] = Feed.sanitize_keywords(new_info[:keywords]) if new_info[:keywords]

    new_info.each_pair do |attr, value|
      self[attr] = value if self.respond_to?(attr)
    end
  end

  def self.sanitize_keywords(keywords)
    keywords = keywords.split(/,/) unless keywords.kind_of?(Array)
    keywords.collect {|k| k.strip }.uniq.select {|k| k.present? }
  end

end
