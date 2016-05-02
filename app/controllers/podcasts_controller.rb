class PodcastsController < ApplicationController

  def create
    WebsiteWorker.perform_async(params[:url], nil, true)
    render json: { success: true }
  end

  def index
    query = Feed.where(:published => true)

    search = if params[:search] != "" then params[:search] else nil end
    limit = [ params[:limit].to_i, 20 ].min
    offset = params[:offset].to_i

    query = query.where(:_id => { :$in => params[:_ids] }) if params[:_ids]
    query = query.where(:$text => { :$search => search }) if search
    query = query.limit( limit )
    query = query.offset( offset )
    query = query.order_by(:most_recent_entry_date => 'desc')

    render json: query
  end

  def show
    @entry = Feed.find(params[:id])

    respond_to do |format|
      format.json { render json: @entry }
      format.html { render 'sharing/share', :layout => nil }
    end
  end

end
