class GroupsController < ApplicationController
  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
  end

  def edit
  end

  def update
  end

end
