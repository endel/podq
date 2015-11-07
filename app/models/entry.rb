class Entry
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  include Mongoid::Timestamps::Updated

  belongs_to :feed

  field :permalink, type: String
  field :published, type: DateTime

  field :title, type: String
  field :description, type: String

  field :audio_url, type: String
  field :image, type: String
  field :duration, type: String

  field :keywords, type: Array

  # run 'rake db:mongoid:create_indexes' to create indexes
  index({ permalink: 1 }, { unique: true, background: true })
  index({ keywords: "text" })

  # <item>
  #   <link>http://www.grokpodcast.com/2015/07/30/episodio-143-clojure/</link>
  #   <title>143 - Clojure</title>
  #   <pubDate>Thu, 30 Jul 2015 00:00:00 -0400</pubDate>
  #   <description><![CDATA[<p>Fechamos nossa série <strong>A Linguagem Clojure</strong> com <a href="https://twitter.com/leonardo_borges" target="_blank">Leonardo Borges</a> da <a href="https://www.atlassian.com/" target="_blank">Atlassian</a> e <a href="https://twitter.com/p_balduino" target="_blank">Plínio Balduino</a> com chave de ouro.  <p>Vamos falar sobre o ecosistema de ferramentas Clojure, incluindo editores de texto, packaging e muito mais. Na sequência vamos falar sobre como aprender a linguagem, indicações de livros e sites e também falar de algumas comunidades no Brasil. Groke e divirta-se conosco :)</p> ]]></description>
  #
  #   <enclosure url="http://media.grokpodcast.com/grokpodcast-143-clojure.mp3" length="1" type="audio/mpeg" />
  #   <guid>http://media.grokpodcast.com/grokpodcast-143-clojure.mp3</guid>
  #
  #   <itunes:author>Carlos Brando / Rafael Rosa</itunes:author>
  #   <itunes:summary>Fechamos nossa série A Linguagem Clojure com Leonardo Borges da Atlassian e Plínio Balduino com chave de ouro. Vamos falar sobre o ecosistema de ferramentas Clojure, incluindo editores de texto, packaging e muito mais. Na sequência vamos falar sobre como aprender a linguagem, indicações de livros e sites e também falar de algumas comunidades no Brasil. Groke e divirta-se conosco :)</itunes:summary>
  #   <itunes:image href="http://www.grokpodcast.com/images/2015/07/vitrine-143.jpg" />
  #   <itunes:duration>30:31</itunes:duration>
  #   <itunes:keywords>Podcast, Convidados, Leonardo Borges, Plínio Balduino, Clojure, Programação funcional, LISP</itunes:keywords>
  # </item>

end
