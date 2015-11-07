class FeedWorker
  include Sidekiq::Worker

  def perform(url)
    xml = Faraday.get(url).body
    feed = Feedjira::Feed.parse xml
    puts feed.inspect
  end

end
