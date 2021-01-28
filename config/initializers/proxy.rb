require 'rack/reverse_proxy'

Rails.application.config.middleware.insert(0, Rack::ReverseProxy) do
  reverse_proxy_options preserve_host: true
  reverse_proxy /^\/uploads\/?(.*)$/, 'https://rails-reverse-proxy-s3.s3.eu-west-1.amazonaws.com/uploads/$1'
end