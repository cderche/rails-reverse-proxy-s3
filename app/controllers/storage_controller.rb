class StorageController < ApplicationController

  def presigned_post
    data = S3_BUCKET.presigned_post(
      key: "uploads/#{SecureRandom.uuid}/${filename}",
      success_action_status: "201",
      acl: "public-read",
    )

    puts data.url
    puts data.fields

    render json: { url: data.url, fields: data.fields }, status: :ok
  end

  def presigned_url
    
    # Fix for s3 key : Replace %2F with / and remove the first /
    filepath = params[:filepath].gsub("%2F", "/")[1..-1] 

    data = S3_BUCKET.object(filepath).presigned_url(
      :get,
      expires_in: 3600,
    )
    uri = URI(data)
    path = "#{uri.path}?#{uri.query}"
    render json: { path: path }, status: :ok
  end

end
