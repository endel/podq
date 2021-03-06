class UpdateWorker
  include Sidekiq::Worker
  sidekiq_options unique: :until_and_while_executing, retry: 3

  def perform()
    last_update = Time.at(Redis.current.get('last_update').to_i)
    now = Time.now.to_i

    feeds = Feed.where(:updated_at => { :$lt => last_update })
    feeds.each do |feed|
      FeedWorker.perform_async(feed.url, feed._id.to_s) if feed.url && feed.published
    end

    Redis.current.set('last_update', now)
  end

end
