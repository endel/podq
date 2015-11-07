class Feed
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  include Mongoid::Timestamps::Updated

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

  # run 'rake db:mongoid:create_indexes' to create indexes
  index({ permalink: 1 }, { unique: true, background: true })
  index({ keywords: "text" })

  def before_save
    # convert https to http
    self.permalink = self.permalink.gsub('https://', 'http://')
  end

end
