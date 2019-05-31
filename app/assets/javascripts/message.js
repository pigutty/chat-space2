$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var image = (message.image !== null)? `<img src="${message.image}" class="content__message__image"></img>` : "" ;
    var html = `<div class="message" data-message-id='${message.id}'>
                  <div class="message__upper">
                    <div class="message__upper__user">${message.user_name}</div>
                    <div class="message__upper__date">${message.created_at}</div>
                  </div>
                  <div class="message__lower">${message.content}</p>
                    ${image}
                  </div>
                </div>`
      return html;
  }
  $('#new_message').on('submit',function(e){
    var formData = new FormData(this);
    var send_url = $(this).attr('action');
    $.ajax({
      url: send_url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      var height = $('.messages')[0].scrollHeight;
      $('.messages').animate({scrollTop:height});
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました。');
    })
    return false;
  });
});
