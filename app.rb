require 'sinatra'
require 'coffee-script'
require 'sass'
require 'boilerpipe'
require 'json'

get '/' do
  url = params['url']
  if url
    articletext = Boilerpipe.extract(url, {:output => :text, :extractor => :ArticleExtractor})
    size = articletext.split.size
    {:url => url, :size => size}.to_json
  else
    "No URL passed in"
  end
end