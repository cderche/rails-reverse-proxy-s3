Rails.application.routes.draw do
  get 'documents/upload'
  get 'storage/presigned_post'
  get 'storage/presigned_url'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
