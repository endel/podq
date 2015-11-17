require 'faraday_middleware'

class FeedWorker
  include Sidekiq::Worker
  sidekiq_options unique: :until_and_while_executing, retry: 3

  AUDIO_FORMATS = '\.mp3|\.ogg|\.acc|\.flac|\.m4a|api\.soundcloud\.com\/tracks\/[0-9]+'
  AUDIO_FORMATS_DESCRIPTION = '(https?:\/\/.*(\.mp3|\.ogg|\.acc|\.flac|\.m4a|api\.soundcloud\.com\/tracks\/[0-9]+))'

  def perform(feed_url, feed_id = nil)
    feed = if feed_id then Feed.find(feed_id) else nil end

    http = Faraday.new {|c|
      c.use FaradayMiddleware::FollowRedirects
      c.adapter :net_http
    }
    xml = http.get(feed_url).body

    # Prioritize ITunesRSS format
    xml_feed = Feedjira::Feed.parse_with(Feedjira::Parser::ITunesRSS, xml)

    unless is_valid_feed?(xml, xml_feed)
      xml_feed = Feedjira::Feed.parse(xml)

      # Maybe feed is not in ITunesRSS format.
      # Try to use whatever format it finds
      unless is_valid_feed?(xml, xml_feed)
        raise 'invalid RSS file'
      end
    end

    feed_permalink = Feed.normalize_url(xml_feed.url)
    feed_url = xml_feed.try(:itunes_new_feed_url) || feed_url
    keywords = xml_feed.try(:categories) || xml_feed.try(:itunes_categories)

    # query for feed if _id is not provided
    unless feed
      if xml_feed.url
        feed_query = {permalink: feed_permalink}
      else
        feed_query = {url: feed_url}
      end
      feed = Feed.find_or_create_by(feed_query)
    end

    feed.permalink = feed_permalink
    feed.url = feed_url

    new_info = HashWithIndifferentAccess.new()
    new_info[:title] = xml_feed.title.strip if xml_feed.try(:title)
    new_info[:description] = xml_feed.description.strip if xml_feed.try(:description)
    new_info[:image] = xml_feed.itunes_image if xml_feed.try(:itunes_image)
    new_info[:language] = xml_feed.language if xml_feed.try(:language)
    new_info[:keywords] = Feed.sanitize_keywords(keywords) if keywords

    # TODO: Website or RSS has more descriptive data?
    feed.update_info(new_info)

    # enqueue to index website to retrieve missing info
    unless feed.image || feed.description || feed.title || feed.keywords
      WebsiteWorker.perform_async(xml_feed.url)
    end

    entries_saved = 0
    xml_feed.entries.each do |xml_entry|
      keywords = xml_entry.try(:categories) || xml_entry.try(:itunes_keywords)

      entry = Entry.find_or_create_by(permalink: Feed.normalize_url(follow_permalink_redirect(xml_entry.try(:url) || xml_entry.try(:entry_id) || xml_entry.try(:enclosure_url))))
      entry.feed_id = feed._id
      entry.published = xml_entry.published
      entry.title = xml_entry.title
      entry.description = sanitize_description( xml_entry.try(:content) || xml_entry.try(:summary) )
      entry.keywords = Feed.sanitize_keywords(keywords) if keywords
      entry.audio_url = xml_entry.try(:enclosure_url)
      entry.image = xml_entry.try(:itunes_image) || xml_entry.try(:image)

      # entry image
      if !entry.audio_url && entry.image && entry.image.match(/#{AUDIO_FORMATS}$/)
        entry.audio_url = entry.image
        entry.image = nil
      end

      # skip if can't find audio_url
      if !entry.audio_url && entry.description && entry.description.match(/#{AUDIO_FORMATS}/)
        entry.audio_url = extract_audio_from_description(entry.description)
      end

      next unless entry.audio_url

      entries_saved += 1
      entry.save
    end

    # all entries retrieved, let's publish the feed
    feed.published = true if entries_saved > 0
    feed.save

    true
  end

  def extract_audio_from_description(description)
    audio_url = nil

    matches = description.scan(/#{AUDIO_FORMATS_DESCRIPTION}/)
    matches.each do |(match, extension)|
      puts match.inspect
      if match.index('soundcloud') && (track_id = match.match(/tracks\/([0-9]+)/))
        audio_url = "https://api.soundcloud.com/tracks/#{ track_id[1] }/stream?client_id=#{ ENV['SOUNDCLOUD_CLIENT_ID'] }"
      else
        audio_url = match.match(/([^'"]+)/)[1]
      end
    end

    audio_url
  end

  def follow_permalink_redirect(permalink)
    http = Faraday.new {|c|
      c.use FaradayMiddleware::FollowRedirects
      c.adapter :net_http
    }
    data = http.head(permalink)
    data.env.url.to_s
  rescue
    permalink
  end

  def sanitize_description(description)
    if description
      description.
        gsub(/style=["']([^'"]+)["']/, "")
    end
  end

  def is_valid_feed?(xml, xml_feed)
    num_audio_matches = xml.scan(/#{AUDIO_FORMATS}/).length
    return (num_audio_matches > (xml_feed.entries.length / 2))
  end

end
