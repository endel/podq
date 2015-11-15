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

    #
    # scan facebook open-graph data and update Feed data
    #
    if (data = html.scan(/property=["|']og:(.*)["|'].*content=["|'](.*)["|']/))
      og = OpenStruct.new(Hash[ data ])

      if og.title && og.description && og.image
        feed.title = og.title.strip
        feed.description = og.description.strip
        feed.image = og.image
        feed.has_og_tags = true
      end

      if !feed.language && feed.description
        cld = CLD.detect_language(ActionView::Base.full_sanitizer.sanitize(feed.description))
        feed.language = cld[:code]
      end

      feed.save
    end

    #
    # enqueue FeedWorker
    #
    if update_feed
      feed_tags = html.scan(/<link(.*)type=["|']application\/(rss|atom)\+xml["|']([^>]+)?>/i)
      puts feed_tags.inspect

      feed_tags.each do |data|
        puts data.inspect

        if (href = data.select {|d| (d||"").index('href=') != nil }[0])
          puts href.inspect

          if (feed_url = href.match(/href=["|']([^"|']+)["|']/)[1])
            puts feed_url.inspect

            if feed_url.index('//') == 0
              # append "http" on the beginning of url,
              # if it's set as protocol agnostic (//)
              feed_url = "http:#{feed_url}"
            elsif feed_url.index('/') == 0
              # remove "/" from the beginning of url, since it's already present
              # on normalized permalink
              feed_url = feed_url[1..-1]
            end

            # append base url on feed url, if needed
            feed_url = "#{feed.permalink}#{feed_url}" unless feed_url.index(/https?:\/\//)

            # try to download & index all entries from all RSS links
            # feeds without audio files will be considered invalid
            FeedWorker.perform_async(HTMLEntities.new.decode(feed_url), feed._id.to_s)
          end
        end
      end

    end

    true
  end

end
