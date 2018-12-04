Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'ultrasoul#top', as: 'top'

  get "/result" => 'ultrasoul#result', as: 'result'

  get '/ready' => 'ultrasoul#ready', as: 'ready'

  get '/about' => 'ultrasoul#about', as: 'about'

  get '/ultrasoul' => 'ultrasoul#ultrasoul', as: 'ultrasoul'

  # get '/result' => 'ultrasoul#result', as: 'result'

end
