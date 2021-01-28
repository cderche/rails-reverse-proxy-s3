require 'test_helper'

class StorageControllerTest < ActionDispatch::IntegrationTest
  test "should get upload" do
    get storage_upload_url
    assert_response :success
  end

end
