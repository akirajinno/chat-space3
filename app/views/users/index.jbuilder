# jbuilderを使ってJS側に返す処理、json形式のデータを配列で返したい時'array!'使用

json.array! @users do |user|
  json.id user.id
  json.name user.name
end