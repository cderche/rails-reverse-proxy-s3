# README

## Key files

### app/controllers/storage_controller

- `presigned_post` method is used to get a presigned url from s3 what we can post a file to.
- `presigned_url` method is used to get a presigned url to a file on s3. We return only the path as we reverse proxy to s3.

### app/javascript/components/Upload.jsx

- React component that allows the user to upload files
- On submission, we request from `presigned_post` the fields required to upload a file directly to s3.
- We put the fields into a FormData object along with the file.
- We post the FormData to the url. through the `onUploadProgress` function we show the progress.
- On completion, we parse the XML response and extract the url (`uploadURL`) it was uploaded to.
- We then use `uploadURL` to get a presigned url to download the object
- The download url is a path that uses our reverse proxy into s3

### config/initializers/proxy.rb

- holds the reverse proxy settings

### config/initializers/cors.rb

- holds certain cors properties
- I don't know if this is useful

## AWS Setup

- a `S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (put them in a `.env` file)
- The bucket is configured with the following cors.

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "http://localhost:3000"
        ],
        "ExposeHeaders": []
    }
]
```

- Block public access (bucket settings):
  - Block all public access - Off
  - Block public access to buckets and objects granted through new access control lists (ACLs) - Off
  - Block public access to buckets and objects granted through any access control lists (ACLs) - On
  - Block public access to buckets and objects granted through new public bucket or access point policies - On
  - Block public and cross-account access to buckets and objects through any public bucket or access point policies - On