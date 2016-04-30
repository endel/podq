require 'faraday_middleware'

class WebsiteWorker
  include Sidekiq::Worker
  sidekiq_options unique: :until_and_while_executing, retry: 3

  def perform(permalink, feed_id = nil, update_feed = false)
    permalink = Feed.normalize_url(permalink)

    http = Faraday.new {|c|
      c.use FaradayMiddleware::FollowRedirects
      c.adapter :net_http
    }
    html = http.get(permalink).body

    # A XML url was given, skip and enqueue it to FeedWorker
    if html.strip.index('<?xml') == 0
      puts "That's an XML. FeedWorker, please..."
      return FeedWorker.perform_async(permalink, feed_id)
    end

    if feed_id
      feed = Feed.find(feed_id)
    else
      feed = Feed.find_or_create_by(permalink: permalink)
    end

    page_properties = HashWithIndifferentAccess.new

    # scan page meta tags
    if (meta = html.scan(/meta name=["|'](.*)["|'].*content=["|'](.*)["|']/i))
      page_properties = HashWithIndifferentAccess[ meta.collect {|(name, value)|
        [ name.downcase.gsub("twitter:", ""), value ]
      } ]
    end

    # scan page title
    if (title = html.scan(/<title>([^<]+)<\/title>/i)[0])
      page_properties[:title] = title.first
    end

    # scan all images, and get the first one
    if !page_properties[:image].present? && (images = html.scan(/<img[^>]+/i))
      first_image = images.first
      if first_image && (image = first_image.scan(/src=['"]([^'"]+)['"]/i)[0])
        page_properties[:image] = get_absolute_url(image.first, feed.permalink)
      end
    end

    # scan facebook open-graph data, override previous fetched data
    if (data = html.scan(/property=["|']og:(.*)["|'].*content=["|'](.*)["|']/i)) && data.length > 0
      page_properties = page_properties.merge(HashWithIndifferentAccess[ data ])
      page_properties[:has_og_tags] = true
    end

    if !feed.language && feed.description
      cld = CLD.detect_language(ActionView::Base.full_sanitizer.sanitize(feed.description))
      page_properties[:language] = cld[:code]
    end

    feed.update_info(page_properties)
    feed.save

    #
    # enqueue FeedWorker
    #
    if update_feed
      feed_tags = html.scan(/<link(.*)type=["|']application\/(rss|atom)\+xml["|']([^>]+)?>/i)

      feed_tags.each do |data|

        if (href = data.select {|d| (d||"").index('href=') != nil }[0])
          if (feed_url = href.match(/href=["|']([^"|']+)["|']/)[1])

            # try to download & index all entries from all RSS links
            # feeds without audio files will be considered invalid
            absulute_url = get_absolute_url(feed_url, feed.permalink)
            FeedWorker.perform_async(absulute_url, feed._id.to_s) if absulute_url

          end
        end

      end

    end

    true
  end

  def get_absolute_url(relative_url, permalink)
    if relative_url.index('//') == 0
      # append "http" on the beginning of url,
      # if it's set as protocol agnostic (//)
      relative_url = "http:#{relative_url}"
    elsif relative_url.index('/') == 0
      # remove "/" from the beginning of url, since it's already present
      # on normalized permalink
      relative_url = relative_url[1..-1]
    end

    # append base url on feed url, if needed
    relative_url = "#{permalink}#{relative_url}" unless relative_url.index(/https?:\/\//)
    HTMLEntities.new.decode(relative_url)
  end

end
