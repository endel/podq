class WebsiteWorker
  include Sidekiq::Worker
  sidekiq_options unique: :until_and_while_executing

  def perform(permalink, update_feed = false)
    permalink = Feed.normalize_url(permalink)
    html = Faraday.get(permalink).body

    # A XML url was given, skip and enqueue it to FeedWorker
    return FeedWorker.perform_async(permalink) if html.strip.index('<?xml') == 0

    feed = Feed.find_or_create_by(permalink: permalink)

    #
    # scan facebook open-graph data and update Feed data
    #
    if (data = html.scan(/property=["|']og:(.*)["|'].*content=["|'](.*)["|']/))
      og = OpenStruct.new(Hash[ data ])
      feed.title = og.title.strip unless feed.title
      feed.description = og.description.strip unless feed.description
      feed.image = og.image unless feed.image

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
      feed_tags = html.scan(/<link(.*)type=["|']application\/(rss|atom)\+xml["|']([^>]+)?>/)
      logger.info feed_tags.inspect

      feed_tags.each do |data|
        logger.info data.inspect

        if (href = data.select {|d| d.index('href=') != nil }[0])
          logger.info href.inspect

          if (feed_url = href.match(/href=["|']([^"|']+)["|']/)[1])
            logger.info feed_url.inspect

            # remove "/" from the beginning of url, since it's already present
            # on normalized permalink
            feed_url = feed_url[1..-1] if feed_url.index('/') == 0

            # append base url on feed url, if needed
            feed_url = "#{feed.permalink}#{feed_url}" unless feed_url.index(/https?:\/\//)

            logger.info feed_url.inspect

            # try to download & index all entries from all RSS links
            # feeds without audio files will be considered invalid
            FeedWorker.perform_async(feed_url)
          end
        end
      end

    end

    true
  end

end
