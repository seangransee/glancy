require 'sinatra'
require 'boilerpipe'
require 'json'

configure do
  enable :cross_origin
end

get '/' do
  headers['Access-Control-Allow-Origin'] = ['http://news.ycombinator.com']
  url = params['url']
  if url
    articletext = Boilerpipe.extract(url, {:output => :text, :extractor => :ArticleExtractor})
    size = articletext.split.size
    {:url => url, :size => size}.to_json
  else
    "No URL passed in"
  end
end