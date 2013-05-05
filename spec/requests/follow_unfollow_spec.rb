require 'spec_helper'

describe "follow and unfollow" do

  it "do follow successfully" do 
    prod_key = "json_goba"
  	product = Product.new
  	product.versions = Array.new
    product.name = "json_goba"
    product.name_downcase = "json_goba"
    product.prod_key = prod_key
    product.prod_type = "RubyGem"
    product.language = "Ruby"
    product.version = "1.0"
    version = Version.new
    version.version = "1.0"
    product.versions.push(version)
    product.save

    user = UserFactory.default
    user.save

    post "/sessions", {:session => {:email => user.email, :password => user.password}}, "HTTPS" => "on"
    assert_response 302
    response.should redirect_to("/user/projects")

    get "/package/json_goba"
    assert_response :success
    assert_tag :tag => "button", :attributes => { :class => "btn btn-large btn-success", :type => "submit" }

    post "/package/follow", :product_key => "json_goba"
    assert_response 302
    response.should redirect_to("/package/json_goba")
    
    prod = Product.find_by_key( prod_key )
    subscribers = prod.subscribers
    subscribers.size.should eq(1)
    subscribers.first.email.should eql( user.email )

    get "/package/json_goba/version/1~0"
    assert_tag :tag => "button", :attributes => { :class => "btn2 btn-large btn-warning", :type => "submit" }
    response.should contain("1 Followers")

    post "/package/unfollow", :product_key => "json_goba", :src_hidden => "detail"
    assert_response 302
    response.should redirect_to("/package/json_goba")

    get "/package/json_goba/version/1~0"
    assert_tag :tag => "button", :attributes => { :class => "btn btn-large btn-success", :type => "submit" }
    response.should contain("0 Followers")

    prod = Product.find_by_key( prod_key )
    subscribers = prod.subscribers
    subscribers.size.should eq(0)
    
    user.remove
    product.remove
  end

end