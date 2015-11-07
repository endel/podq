class FeedsController < ApplicationController

  def create
    WebsiteWorker.perform_async(params[:url], true)
    render json: { success: true }
  end

  def index
    query = Feed.criteria

    if params[:search]
      query = query.where(:$text => { :$search => params[:search] })
    end

    render json: query
  end

end
