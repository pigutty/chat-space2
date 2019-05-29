$(document).on('turbolinks:load',function(){
  $('#new_message').on('submit',function(e){
    e.preventDefault();
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
      console.log(data);
    })
    .fail(function(){
      console.log("失敗");
    })
  });
});
