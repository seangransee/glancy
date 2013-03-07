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

excluded = open('excluded.txt').map { |line| line.split(' ')[0]}
p excluded

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
  if url and not excluded.include?(url.split('/')[2])
    getSize(url)
  else
    {:error => "Empty or invalid URL", :size => nil}.to_json
  end
end