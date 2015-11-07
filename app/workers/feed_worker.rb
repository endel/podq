puts "Worker!"

class FeedWorker
  include Sidekiq::Worker

  def perform(url)
    xml = Faraday.get(url).body
    xml_feed = Feedjira::Feed.parse(xml)

    if xml_feed.instance_of?(Feedjira::Parser::ITunesRSS)
      raise 'Invalid "itunes_new_feed_url"' unless xml_feed.itunes_new_feed_url.present?

      feed = Feed.find_or_create_by(url: xml_feed.itunes_new_feed_url)
      feed.title = xml_feed.title
      feed.permalink = xml_feed.url
      feed.description = xml_feed.description
      feed.language = xml_feed.language
      feed.keywords = sanitize_keywords(xml_feed.itunes_categories)
      feed.image = xml_feed.itunes_image
      feed.save

      xml_feed.entries.each do |xml_entry|
        entry = Entry.find_or_create_by(permalink: xml_entry.url)
        entry.feed_id = feed._id
        entry.published = xml_entry.published
        entry.title = xml_entry.title
        entry.description = xml_entry.summary
        entry.keywords = sanitize_keywords(xml_entry.itunes_keywords)
        entry.image = xml_entry.itunes_image
        entry.audio_url = xml_entry.enclosure_url
        entry.save
      end

    end

  end

  def sanitize_keywords(keywords)
    keywords = keywords.split(/,/) unless keywords.kind_of?(Array)
    keywords.collect {|k| k.strip }.uniq.select {|k| k.present? }
  end

end
