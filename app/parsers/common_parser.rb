class CommonParser  
  
  @@curl_ca_bundle = "/opt/local/share/curl/curl-ca-bundle.crt"
  @@ca_certificates = "/usr/lib/ssl/certs/ca-certificates.crt"
  
  def self.fetch_response(url)
    url = CommonParser.do_replacements_for_github( url )
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    if uri.port == 443 
      http.use_ssl = true
      if File.exist?(@@curl_ca_bundle)
        http.ca_file = @@curl_ca_bundle
      elsif File.exist?(@@ca_certificates)
        http.ca_file = @@ca_certificates
      end      
    end
    path = uri.path
    query = uri.query
    http.get("#{path}?#{query}")
  rescue => e 
    p "#{e}"
    e.backtrace.each do |message|
      p "#{message}"
    end
  end

  def self.do_replacements_for_github(url)
    if url.match(/^https:\/\/github.com\//)
      url = url.gsub("https://github.com", "https://raw.github.com")
      url = url.gsub("/blob/", "/")
    end
    url
  end

  def self.update_requested_with_current( dependency, product )
    if product && product.version
      dependency.version_requested = product.version
    else
      dependency.version_requested = "UNKNOWN"
    end
    dependency
  end

end