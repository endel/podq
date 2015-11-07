class WebsiteWorker
  include Sidekiq::Worker
  sidekiq_options unique: :until_and_while_executing

  def perform(permalink, update_feed = false)
    feed = Feed.find_or_create_by(permalink: Feed.normalize_url(permalink))
    html = Faraday.get(feed.permalink).body

    #
    # scan facebook open-graph data and update Feed data
    #
    if (data = html.scan(/property=["|']og:(.*)["|'].*content=["|'](.*)["|']/))
      og = OpenStruct.new(Hash[ data ])
      feed.title = og.title unless feed.title
      feed.description = og.description unless feed.description
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

      feed_tags.each do |data|
        if (href = data.select {|d| d.index('href=') != nil }[0])
          if (feed_url = href.match(/href=["|']([^"|']+)["|']/)[1])
            # append base url on feed url, if needed
            feed_url = "#{permalink}#{feed_url}" unless feed_url.index(/https?:\/\//)

            # try to download & index all entries from all RSS links
            # feeds without audio files will be considered invalid
            FeedWorker.perform_async(feed_url)
          end
        end
      end

    end

  end

end
