class EntriesController < ApplicationController

  def index
    query = nil

    if params[:feed_id]
      query = Feed.find(params[:feed_id]).entries.criteria
    else
      query = Entry.criteria
    end

    if params[:search]
      query = query.where(:$text => { :$search => params[:search] })
    end

    render json: query
  end

end

