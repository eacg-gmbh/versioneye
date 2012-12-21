require 'spec_helper'

describe User do
  
  before(:each) do
    @user = User.new
    @user.fullname = "Hans Tanz"
    @user.username = "hanstanz"
    @user.email = "hans@tanz.de"
    @user.password = "password"
    @user.salt = "salt"
    @user.fb_id = "asggffffffff"
    @user.github_id = "github_id_123"
    @user.terms = true
    @user.datenerhebung = true
    @user.save

    UserFactory.create_defaults
  end
  
  after(:each) do 
    @user.remove
    UserFactory.clean_defaults
  end
  
  describe "to_param" do
    it "returns username as default param" do
      @user.username = "hanstanz"
      @user.to_param.should eq('hanstanz')
    end
  end

  describe "create_verification" do
    it "generates a verification string" do
      @user.verification.should be_nil
      @user.create_verification
      @user.verification.should_not be_nil
    end
  end
  
  describe "activate!" do
    it "activates a user" do
      @user.create_verification
      @user.save
      verification = @user.verification
      verification.should_not be_nil
      verification.size.should be > 2
      User.activate!(verification)
      user = User.find(@user.id)
      user.should_not be_nil
      user.verification.should be_nil
    end
  end
  
  describe "activated?" do
    it "tests the activated? method" do 
      @user.create_verification
      @user.verification.should_not be_nil
      @user.activated?.should be_false
      @user.verification = nil
      @user.activated?.should be_true      
    end
  end
  
  describe "activate!" do
    it "tests the activated? method" do       
      email = "hans1@tanz.de"
      @user.fullname = "Hans1 Tanz"
      @user.username = "hanstanz1"
      @user.email = email
      @user.password = "password"
      @user.salt = "salt"
      @user.create_verification
      @user.save
      
      db_user = User.find_by_email( email )
      db_user.should_not be_nil
      db_user.verification.should_not be_nil
      db_user.activated?.should be_false
      User.activate!(@user.verification)
      
      db_user2 = User.find_by_email( email )
      db_user2.verification.should be_nil
      db_user2.activated?.should be_true
    end
  end
  
  describe "save" do
    it "saves a new user in the db" do 
      email = "hans2@tanz.de"
      user = User.new
      user.fullname = "Hans Tanz"
      user.username = "hanstanz2"
      user.email = email
      user.password = "password"
      user.salt = "salt"
      user.terms = true
      user.datenerhebung = true
      user.save
      db_user = User.find_by_email( "hans2@TANZ.de" )
      db_user.should_not be_nil
      user.remove
    end
    it "test case for tobias" do 
      email = "t@blinki.st"
      user = User.new
      user.fullname = "Tobias"
      user.username = "blinki"
      user.email = email
      user.password = "password"
      user.salt = "salt"
      user.terms = true
      user.datenerhebung = true
      user.save
      db_user = User.find_by_email( email )
      db_user.should_not be_nil
      db_user.remove
    end
    it "dosn't save. Because username is unique" do 
      email = "hans2@tanz.de"
      user = User.new
      user.fullname = "Hans Tanz"
      user.username = "hanstanz"
      user.email = email
      user.password = "password"
      user.salt = "salt"
      user.terms = true
      user.datenerhebung = true
      user.save.should be_false
      db_user = User.find_by_email( email )
      db_user.should be_nil
      user.remove
    end
    it "dosn't save. Because email is unique" do 
      email = "hans@tanz.de"
      user = User.new
      user.fullname = "Hans Tanz"
      user.username = "hanstanz55"
      user.email = email
      user.password = "password"
      user.salt = "salt"
      user.terms = true
      user.datenerhebung = true
      user.save.should be_false
      user.remove
    end
    it "dosn't save. Because email is not valid" do 
      email = "hans@tanz"
      user = User.new
      user.fullname = "Hans Tanz"
      user.username = "hanstanz5gasg"
      user.email = email
      user.password = "password"
      user.salt = "salt"
      user.terms = true
      user.datenerhebung = true
      save = user.save
      p "save is #{save}"
      save.should be_false
      db_user = User.find_by_email( email )
      db_user.should be_nil
      user.remove
    end
  end
  
  describe "fetch_my_products" do
    it "fetches one product" do 
      product = Product.new
      product.name = "name"
      product.prod_key = "gasgagasgj8623_junit/junit"
      product.save
      
      follower = Follower.new
      follower.user_id = @user.id
      follower.product_id = product.id.to_s
      follower.notification = false
      follower.save
      
      products = @user.fetch_my_products
      products.count.should eql(1)
      
      product.remove
      follower.remove
    end    
  end
  
  describe "fetch_my_product_ids" do
    it "fetches the product ids" do     
      product = Product.new
      product.name = "name"
      product.prod_key = "gasgagasgj8623_junit/junit"
      product.save
      
      product2 = Product.new
      product2.name = "name2"
      product2.prod_key = "2gasgagasgj8623_junit/junit"
      product2.save
      
      product3 = Product.new
      product3.name = "name3"
      product3.prod_key = "32gasgagasgj8623_junit/junit"
      product3.save
      
      follower = Follower.new
      follower.user_id = @user.id
      follower.product_id = product.id.to_s
      follower.notification = false
      follower.save
      
      follower2 = Follower.new
      follower2.user_id = @user.id
      follower2.product_id = product2.id.to_s
      follower2.notification = false
      follower2.save
      
      ids = @user.fetch_my_product_ids
      ids.count.should eql(2)
      ids.include?(product.id.to_s).should be_true
      ids.include?(product2.id.to_s).should be_true
      
      product.remove
      product2.remove
      product3.remove
      follower.remove
      follower2.remove
    end
  end
  
  describe "has_password?" do
    it "doesn't have the password" do     
      @user.has_password?("agfasgasfgasfg").should be_false
    end
    it "does have the password" do     
      @user.has_password?("password").should be_true
    end
  end
  
  describe "find_by_email" do
    it "doesn't find by email" do     
      User.find_by_email("agfasgasfgasfg").should be_nil
    end
    it "does find by email" do     
      user = User.find_by_email("hans@tanz.de")
      user.should_not be_nil
      user.email.eql?(@user.email).should be_true
      user.id.eql?(@user.id).should be_true
    end
  end
  
  describe "find_by_username" do
    it "doesn't find by username" do     
      User.find_by_username("agfasgasfgasfg").should be_nil
    end
    it "does find by username" do     
      user = User.find_by_username("hanstanz")
      user.should_not be_nil
      user.username.eql?(@user.username).should be_true
      user.id.eql?(@user.id).should be_true
    end
  end
  
  describe "find_by_fb_id" do
    it "doesn't find by fb_id" do     
      User.find_by_fb_id("agfasgasfgasfg").should be_nil
    end
    it "does find by email" do     
      user = User.find_by_fb_id("asggffffffff")
      user.should_not be_nil
      user.fb_id.eql?(@user.fb_id).should be_true
      user.id.eql?(@user.id).should be_true
    end
  end

  describe "find_by_github_id" do
    it "doesn't find by github id" do     
      User.find_by_github_id("agfgasasgasfgasfg").should be_nil
    end
    it "does find by email" do     
      user = User.find_by_github_id("github_id_123")
      user.should_not be_nil
      user.github_id.eql?(@user.github_id).should be_true
      user.id.eql?(@user.id).should be_true
    end
  end
  
  describe "authenticate" do
    it "doesn't authenticate" do     
      User.authenticate("agfasgasfgasfg", "agsasf").should be_nil
    end
    it "does authenticate" do     
      user = User.authenticate("hans@tanz.de", "password")
      user.should_not be_nil
      user.id.eql?(@user.id).should be_true
    end
  end
  
  describe "authenticate_with_salt" do
    it "doesn't authenticate" do     
      User.authenticate_with_salt(33333, "agsasf").should be_nil
    end
    it "does authenticate" do     
      user = User.authenticate_with_salt(@user.id, @user.salt)
      user.should_not be_nil
      user.id.eql?(@user.id).should be_true
    end
  end
  
  describe "username_valid?" do
    it "is not" do     
      User.username_valid?("agsasf").should be_true
    end
    it "is" do     
      User.username_valid?(@user.username).should be_false
    end
  end
  
  describe "email_valid?" do
    it "is not" do     
      User.email_valid?("agsasf").should be_true
    end
    it "is not because it is in email_user" do
      user_email = UserEmail.new
      user_email.email = "tada@hoplaho.de"
      user_email.user_id = @user.id.to_s
      user_email.save
      User.email_valid?(user_email.email).should be_false
      user_email.remove
    end
    it "is" do     
      User.email_valid?(@user.email).should be_false
    end
  end
  
  describe "update_password" do
    it "does not update the password" do     
      @user.update_password(@user.email, "passwordasg", "asgasgfs").should be_false
    end
    it "does update the password" do     
      @user.update_password(@user.email, @user.password, "newpassword").should be_true
      user = User.authenticate(@user.email, "newpassword")
      user.should_not be_nil
    end
  end
  
  describe "reset_password" do
    it "does reset the password" do     
      user = User.authenticate(@user.email, @user.password)
      user.should_not be_nil
      user.reset_password
      new_password = user.password
      us = User.authenticate(@user.email, new_password)
      us.should_not be_nil
    end
  end
  
  describe "create_username" do
    
    it "does create a username" do 
      @user.fullname = "Robert Reiz"
      @user.create_username
      @user.username.should eql("RobertReiz")
    end
    
    it "does create a username and replace -" do 
      @user.fullname = "Hans -Reiz"
      @user.create_username
      @user.username.should eql("HansReiz")
    end
    
    it "does create a username with a randomValue" do 
      @user.fullname = "Robert Reiz"
      @user.create_username
      @user.username.should eql("RobertReiz")
      @user.save
      
      user = User.new
      user.fullname = "Robert Reiz"
      user.create_username
      user.username.size.should > 12
    end
    
  end
  
  describe "update_from_fb_json" do
    
    it "updates and saves" do 
      json_user = Hash.new
      json_user["name"] = "hans super tanz"
      json_user["username"] = "hanzpanztanz"
      json_user["email"] = "hans@panz.de"
      json_user["id"] = "asgasgasgasg"
      user = User.new
      user.update_from_fb_json(json_user, "token_asgasg")
      user.terms = true
      user.datenerhebung = true
      user.save.should be_true
      user.remove
    end
    
  end

  describe "non_followers" do 
    it "returns same number of user when users follow nothing" do
      User.non_followers.count.should eql(User.all.count)
    end
    it "returns one user less, when one user starts following new Project" do
      user = User.all.first
      Follower.new(user_id: user.id, product_id: 1).save()
      User.non_followers.count.should eql(User.all.count - 1)
    end
  end

  describe "follows_least" do
    it "returns all users, when argument is 0" do
      User.follows_least(0).count.should eql(User.all.count)
    end
    
    it "returns nothing, when there's no user with specified number follows" do
      User.follows_least(1).count.should eql(0)
    end

    it "returns only 1 user, who follows least n packages" do
      user = User.all.first
      Follower.new(user_id:  user.id, product_id: 1).save()
      User.follows_least(1).count.should eql(1)
    end
  end

  describe "follows_max" do
    it "returns all users, when n is large enough" do
      User.follows_max(32768).count.should eql(User.all.count)
    end 

    it "returns one user less, when one of un-followers starts following new package" do
      user = User.all.first
      Follower.new(user_id: user.id, product_id: 1).save()
      User.follows_max(1).count.should eql(User.all.count - 1)
    end
  end

end
