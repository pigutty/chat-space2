$(document).on('turbolinks:load',function(){
  $('#user-search-field').on('keyup',function(){
    function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>`
      $('#user-search-result').append(html);
    }

    function appendErrMsgToHTML(msg) {
      var html = `<div class="chat-group-user clearfix>
                    <p class="chat-group-user__name">${msg}</p>
                  </div>`
      $('#user-search-result').append(html);
    }


    function editElement(element){
      var result = '^'+element;
      return result;
    }
    var preWord;
    var input = $('#user-search-field').val();
    var inputs = input.split(" ").filter(function(a) { return a;});
    var newInputs = inputs.map(editElement);
    var word = newInputs.join("|");
    var reg = RegExp(word);
    if (word != preWord){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input},
        dataType: 'json'
      })
      .done(function(users) {
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML('一致するユーザーはいません');
        }
      })
      .fail(function(){
        alert('検索に失敗しました');
      })
    }
    preWord = word;
  });
});
