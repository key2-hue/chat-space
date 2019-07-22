class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:id])
    @messages = @group.messages.includes(:user).where('id > ?', params[:id])
    respond_to do |format|
      format.html
      format.json
    end
  end
end