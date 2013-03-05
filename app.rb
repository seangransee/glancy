require 'sinatra'
require 'coffee-script'
require 'sass'
require 'boilerpipe'

get '/' do
  haml :index
end