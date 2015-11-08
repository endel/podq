class EntriesController < ApplicationController

  def index
    query = nil

    if params[:feed_id]
      query = Feed.find(params[:feed_id]).entries.criteria
    else
      query = Entry.criteria
    end

    query = query.where(:$text => { :$search => params[:search] }) if params[:search]
    query = query.limit(params[:limit]) if params[:limit]

    render json: query
  end

end

