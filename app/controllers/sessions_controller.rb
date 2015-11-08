class SessionsController < ApplicationController

  def new
    redirect_to '/auth/twitter'
  end

  def create
    auth = request.env["omniauth.auth"]

    @user = User.where({
      provider: auth['provider'],
      uid: auth['uid'].to_s
    }).first || User.create_with_omniauth(auth)

    # Reset the session after successful login, per
    # 2.8 Session Fixation – Countermeasures:
    # http://guides.rubyonrails.org/security.html#session-fixation-countermeasures
    reset_session
    session[:user_id] = @user._id.to_s
  end

  def destroy
    reset_session
    redirect_to root_url, :notice => 'Signed out!'
  end

end

