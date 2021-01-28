class StorageController < ApplicationController
  def presigned_post
    data = S3_BUCKET.presigned_post(
      key: "uploads/#{SecureRandom.uuid}/${filename}",
      success_action_status: "201",
      acl: "public-read",
    )

    render json: { url: data.url, fields: data.fields }, status: :ok
  end

  def presigned_url
    filepath = params[:filepath]
    data = S3_BUCKET.object(filepath).presigned_url(
      :get,
      expires_in: 3600,
    )
    puts data
    render json: { url: data }, status: :ok
  end
end
