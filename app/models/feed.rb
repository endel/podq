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

  # <title>Grok Podcast</title>
  # <atom:link href="http://www.grokpodcast.com/atom.xml" rel="self" type="application/rss+xml" />
  # <link>http://www.grokpodcast.com</link>
  # <description>Um podcast feito para programadores e empreendedores.</description>
  # <lastBuildDate>Thu, 30 Jul 2015 13:41:27 -0400</lastBuildDate>
  # <sy:updatePeriod>hourly</sy:updatePeriod>
  # <sy:updateFrequency>1</sy:updateFrequency>
  # <language>pt-BR</language>
  # <copyright>Copyright © Grok Podcast 2010 - 2013</copyright>
  # <managingEditor>eduardobrando@gmail.com (Grok Podcast)</managingEditor>
  # <webMaster>eduardobrando@gmail.com (Grok Podcast)</webMaster>

  # <itunes:new-feed-url>http://www.grokpodcast.com/atom.xml</itunes:new-feed-url>
  # <itunes:subtitle></itunes:subtitle>
  # <itunes:summary>Um podcast feito para programadores e empreendedores.</itunes:summary>
  # <itunes:keywords></itunes:keywords>
  # <itunes:category text="Technology">
  #   <itunes:category text="Podcasting" />
  # </itunes:category>
  # <itunes:category text="Business">
  #   <itunes:category text="Careers" />
  # </itunes:category>
  # <itunes:category text="Technology" />
  # <itunes:author>Carlos Brando / Rafael Rosa</itunes:author>
  # <itunes:owner>
  #   <itunes:name>Carlos Brando / Rafael Rosa</itunes:name>
  #   <itunes:email>eduardobrando@gmail.com</itunes:email>
  # </itunes:owner>
  # <itunes:block>no</itunes:block>
  # <itunes:explicit>no</itunes:explicit>
  # <itunes:image href="http://www.grokpodcast.com/images/logo_itunes_grande.png" />

end
