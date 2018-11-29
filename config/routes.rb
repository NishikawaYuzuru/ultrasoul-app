Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'ultrasoul#hello'

  get '/ready' => 'ultrasoul#ready'
end
