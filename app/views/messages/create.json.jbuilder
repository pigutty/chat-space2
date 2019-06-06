json.id @message.id
json.content @message.content
json.user_name @message.user.name
json.created_at @message.created_at.to_s(:default)
json.image @message.image.url
