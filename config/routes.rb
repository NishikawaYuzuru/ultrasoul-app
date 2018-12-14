Rails.application.routes.draw do
  # UltrasoulControllerのtopアクションを呼び出す
  root 'ultrasoul#top', as: 'top'

  # UltrasoulControllerのultrasoulアクションを呼び出す
  get '/ultrasoul' => 'ultrasoul#ultrasoul', as: 'ultrasoul'

  # Jsonを利用して非同期通信を行う
  get "/result" => 'ultrasoul#result', as: 'result'
end
