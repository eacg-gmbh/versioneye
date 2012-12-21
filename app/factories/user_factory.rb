class UserFactory
  def self.create_new_user(n = 1)
    user_data = {:username  => "testuser#{n}",
                  :fullname => "Test User#{n}",
                  :email    => "test.user#{n}@versioneye.com",
                  :password => "12345",
                  :terms    => true,
                  :datenerhebung => true,
                  :salt     => "sugar"
                }
    new_user = User.new user_data
    new_user.save
  end

  def self.create_defaults(n = 5)
    1..n.times {|i| UserFactory.create_new_user(i)}
  end 

  def self.clean_defaults
    rails_mode = "#{ENV['RAILS_ENV']}".strip.downcase.to_sym

    if rails_mode == :test
      User.all.delete_all
      return true
    end

    p "Cant delete Users default_values, because Rails is  in wrong environment: #{rails_mode}."
    return false
  end
end
