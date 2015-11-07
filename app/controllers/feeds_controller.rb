class FeedsController < ApplicationController

  def create
    FeedWorker.perform_async(params[:url])
    render json: { success: true }
  end

  def search
  end

end
