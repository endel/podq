class FeedWorker
  include Sidekiq::Worker
  sidekiq_options unique: :until_and_while_executing

  AUDIO_FORMATS = '(mp3|ogg|acc|flac|m4a)'

  def perform(feed_url)
    xml = Faraday.get(feed_url).body
    xml_feed = Feedjira::Feed.parse(xml)

    num_audio_matches = xml.match(/\.#{AUDIO_FORMATS}/).length
    if num_audio_matches < xml_feed.entries.length
      raise 'invalid RSS file'
    end

    keywords = xml_feed.try(:categories) || xml_feed.try(:itunes_categories)

    feed = Feed.find_or_create_by(permalink: xml_feed.url)
    feed.url = xml_feed.try(:itunes_new_feed_url) || feed_url
    feed.title = xml_feed.title if xml_feed.try(:title)
    feed.description = xml_feed.description if xml_feed.try(:description)
    feed.language = xml_feed.language if xml_feed.try(:language)
    feed.keywords = (keywords and sanitize_keywords(keywords))
    feed.image = xml_feed.itunes_image if xml_feed.try(:itunes_image)
    feed.save

    # enqueue to index website to retrieve missing info
    unless feed.image || feed.description || feed.title || feed.keywords
      WebsiteWorker.perform_async(xml_feed.url)
    end

    xml_feed.entries.each do |xml_entry|
      keywords = xml_entry.try(:categories) || xml_entry.try(:itunes_keywords)

      entry = Entry.find_or_create_by(permalink: xml_entry.url)
      entry.feed_id = feed._id
      entry.published = xml_entry.published
      entry.title = xml_entry.title
      entry.description = xml_entry.try(:content) || xml_entry.try(:summary)
      entry.keywords = keywords and sanitize_keywords(keywords)
      entry.audio_url = xml_entry.try(:enclosure_url)
      entry.image = xml_entry.try(:itunes_image) || xml_entry.try(:image)

      # entry image
      if !entry.audio_url && entry.image.match(/#{AUDIO_FORMATS}$/)
        entry.audio_url = entry.image
        entry.image = nil
      end

      entry.save
    end

  end

  def sanitize_keywords(keywords)
    keywords = keywords.split(/,/) unless keywords.kind_of?(Array)
    keywords.collect {|k| k.strip }.uniq.select {|k| k.present? }
  end

end
