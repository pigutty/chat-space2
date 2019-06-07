$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var image = (message.image !== null)? `<img src="${message.image}" class="content__message__image"></img>` : " " ;
    var html = `<div class="message" data-id='${message.id}'>
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


  var reloadMessages = function() {
    var last_id = $('.message').eq(-1).data('id');
    reload_url_pattern = /messages/;
    var api_url = window.location.pathname.replace(reload_url_pattern,'api/messages');
    $.ajax({
      type: "GET",
      url: api_url,
      data: { last_id: last_id },
      dataType: 'json',
    })
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        if(message.id > last_id) {
          insertHTML += buildHTML(message);
          $('.messages').append(insertHTML);
          var height = $('.messages')[0].scrollHeight;
          $('.messages').animate({scrollTop:height});
        }
      })
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    })
  };

  var interval = setInterval(function() {
    var group_view_url_pattern = /\/groups\/\d+\/messages/;
    var result = window.location.href.match(group_view_url_pattern);
    if (result){
      reloadMessages();
    }
    else {
      clearInterval(interval);
    }
  } ,5000)
});

