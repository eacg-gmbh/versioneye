require 'spec_helper'

describe "Getting data from github_repos_controller" do
  let(:user) {create(:user, username: "pupujuku", fullname: "Pupu Juku", email: "juku@pupu.com")}

  let(:repo1) {create(:github_repo, 
                      user_id: user.id.to_s, 
                      github_id: 1, 
                      fullname: "spec/repo1",
                      user_login: "a", 
                      owner_login: "versioneye", 
                      owner_type: "user",
                     )
                }
  let(:repo2) {create(:github_repo, 
                      user_id: user.id.to_s, 
                      github_id: 2, 
                      fullname: "spec/repo2",
                      user_login: "a", 
                      owner_login: "versioneye", 
                      owner_type: "user",
                     )
              }

  before :each do
    #GithubRepo.delete_all

    get signin_path, nil, "HTTPS" => "on"
    post sessions_path, {session: {email: user.email, password: "12345"}}, "HTTPS" => "on"
    assert_response 302
    response.should redirect_to( user_packages_i_follow_path )
    user.save
    repo1.save
    repo2.save
    user.github_repos << repo1
  end

  after :each do
    FakeWeb.clean_registry
    FakeWeb.allow_net_connect = true
  end

  describe "getting list of repos" do
    it "should return list of repos when repos are already cached" do
      user.github_repos.all.count.should > 0 #factory should fill GithubRepo
      p "Repo from spec: ", user.github_repos.first

      get user_github_repos_path
      response.status.should eql(200)
      
      p response.body
      response_data = JSON.parse response.body
      response_data.has_key?('repos').should be_true
      response_data['repos'].count.should eq(user.github_repos.count)

      resp_repo1, resp_repo2 = response_data['repos']

      resp_repo1['fullname'].should eq(repo1['fullname'])
      resp_repo1['user_id'].should eq(user.id.to_s)

      resp_repo2['fullname'].should eq(repo2['fullname'])
      resp_repo2['user_id'].should eq(user.id.to_s)
    end
  end

  describe "getting repos when cache is empty" do
    before :each do
      GithubRepo.delete_all
      FakeWeb.register_uri(:get,
                           %r|https://api\.github\.com/user/repos*|,
                           :body => [{
                                      "id" => 1296269,
                                      "owner" => {
                                        "login" => "octocat",
                                        "id" => 1,
                                        "avatar_url" => "https://github.com/images/error/octocat_happy.gif",
                                        "gravatar_id" => "somehexcode",
                                        "url" => "https://api.github.com/users/octocat"
                                      },
                                      "name" => "Hello-World",
                                      "full_name" => "octocat/Hello-World",
                                      "description" => "This your first repo!",
                                      "private" => false,
                                      "fork" => false,
                                      "url" => "https://api.github.com/repos/octocat/Hello-World",
                                      "html_url" => "https://github.com/octocat/Hello-World"
                                    }].to_json)
      FakeWeb.register_uri(:get, %r|https://api\.github\.com/repos*|, :body => [].to_json)
      FakeWeb.register_uri(:get, %r|https://api\.github\.com/orgs/versioneye/repos*|, :body => [].to_json)
      FakeWeb.register_uri(:get, %r|https://api\.github\.com/user/orgs*|, :body => [].to_json)
    end

    it "should fill cache of repos and then return list of repos" do
      get user_github_repos_path
      response.status.should eql(200)

      response_data = JSON.parse response.body

      user.github_repos.all.count.should > 0 #caching should fill GithubRepo
      response_data.has_key?('repos').should be_true
      response_data['repos'].count.should eql(user.github_repos.count)

      resp_repo1 = response_data['repos'].first

      resp_repo1['fullname'].should eq("octocat/Hello-World")
      resp_repo1['user_id'].should eq(user.id.to_s)

    end
  end
end
