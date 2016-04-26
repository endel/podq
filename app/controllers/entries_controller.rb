class EntriesController < ApplicationController

  def index
    data = {}
    query = nil

    params[:limit] = 10 unless params[:limit]

    if params[:feed_id]
      data[:feed] = Feed.find(params[:feed_id])
      query = data[:feed].entries.criteria
    else
      query = Entry.criteria
    end

    query = query.where(:$text => { :$search => params[:search] }) if params[:search]
    query = query.limit(params[:limit])

    # always order by published date desc
    query = query.order_by(:published => 'desc')

    data[:entries] = query

    render json: data
  end

  def show
    entry = Entry.find(params[:id])
    render json: entry.to_json(include: :feed)
  end

end

