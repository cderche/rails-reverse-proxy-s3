require 'test_helper'

class DocumentsControllerTest < ActionDispatch::IntegrationTest
  test "should get upload" do
    get documents_upload_url
    assert_response :success
  end

end
