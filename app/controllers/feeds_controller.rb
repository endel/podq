class FeedsController < ApplicationController

  def create
    WebsiteWorker.perform_async(params[:url], true)
    render json: { success: true }
  end

  def search
  end

end
