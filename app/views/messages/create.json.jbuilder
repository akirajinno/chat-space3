json.name @message.user.name
json.content @message.content
json.image @message.image
json.date @message.created_at.strftime('%Y/%m/%d %H:%M:%S')
json.id @message.id