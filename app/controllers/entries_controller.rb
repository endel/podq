class EntriesController < ApplicationController

  def index
    response = {}
    query = nil

    search = if params[:search] != "" then params[:search] else nil end
    limit = [ params[:limit].to_i, 20 ].min
    offset = params[:offset].to_i

    if params[:feed_id]
      response[:feed] = Feed.find(params[:feed_id])
      query = response[:feed].entries.criteria
    else
      query = Entry.criteria
    end

    query = query.where(:$text => { :$search => search }) if search

    # Add total results on response headers
    response[:total_count] = query.count

    query = query.limit( limit )
    query = query.offset( offset )

    # always order by published date desc
    query = query.order_by(:published => 'desc')

    response[:entries] = query

    render json: response
  end

  def show
    entry = Entry.find(params[:id])
    render json: entry.to_json(include: :feed)
  end

end

