require 'sinatra'
require 'boilerpipe'
require 'json'
require 'mongo'

include Mongo

server = ENV['ALG_MONGOSERVER']
port = ENV['ALG_MONGOPORT']
user = ENV['ALG_MONGOUSER']
pass = ENV['ALG_MONGOPASS']

client = Mongo::Connection.new(server, port)
db = client['article-length-glance']
db.authenticate(user, pass)
$coll = db['sizes']

configure do
  enable :cross_origin
end

def lookup(url)
  site = $coll.find_one("url" => url)
  if site
    size = site["size"]
    {:url => url, :size => size}.to_json
  else
    nil
  end
end

def addToDatabase(url, size)
  doc = {"url" => url, "size" => size, "time" => Time.now}
  $coll.insert(doc)
end

def getSize(url)
  from_database = lookup(url)
  if from_database
    from_database
  else
    articletext = Boilerpipe.extract(url, {:output => :text, :extractor => :ArticleExtractor})
    size = articletext.split.size
    addToDatabase(url, size)
    {:url => url, :size => size}.to_json
  end
end

get '/' do
  headers['Access-Control-Allow-Origin'] = '*'
  url = params['url']
  if url
    getSize(url)
  else
    "No URL passed in"
  end
end