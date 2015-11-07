class WebsiteWorker
  include Sidekiq::Worker
  sidekiq_options unique: :until_and_while_executing

  def perform(permalink, update_feed = false)
    feed = Feed.find_or_create_by(permalink: permalink)
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
    unless update_feed
      feed_tags = html.scan(/<link(.*)type=["|']application\/(rss|atom)\+xml["|']([^>]+)?>/)
      feed_tags.each do |(link_tag, type, _)|

        if (match_href = link_tag.match(/href=["|']([^"|']+)["|']/))
          # try to download & index all entries from all RSS links
          # feeds without audio files will be considered invalid
          FeedWorker.perform_async(match_href[1])
        end

      end

    end

  end

end
