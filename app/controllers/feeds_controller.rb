class FeedsController < ApplicationController

  def create
    WebsiteWorker.perform_async(params[:url], nil, true)
    render json: { success: true }
  end

  def index
    query = Feed.criteria

    query = query.where(:_id => { :$in => params[:_ids] }) if params[:_ids]
    query = query.where(:$text => { :$search => params[:search] }) if params[:search]
    query = query.limit(params[:limit]) if params[:limit]

    render json: query
  end

  def show
    feed = Feed.find(params[:id])
    render json: feed
  end

end
