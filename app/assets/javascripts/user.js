$(document).on('turbolinks:load',function(){
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

    function addUser(userId,userName) {
      var html = `<div id='chat-group-users'>
                    <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                      <input name='group[user_ids][]' type='hidden' value='${userId}'>
                        <p class='chat-group-user__name'>${userName}</p>
                        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                    </div>
                  </div>`
      $('#chat-group-users').append(html);
    }


    function editElement(element){
      var result = '^'+element;
      return result;
    }
    var preWord;
    
    $('#user-search-field').on('keyup',function(){
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
        if (input.length !== 0){
          if (users.length !== 0) {
            users.forEach(function(user){
              appendUser(user);
            });
          }
          else {
            appendErrMsgToHTML('一致するユーザーはいません');
          }
        }
      })
      .fail(function(){
        alert('検索に失敗しました');
      })
    }
    preWord = word;
  });

  $(document).on("click", ".user-search-add", function (){
    $('#chat-group-users').val();
    var newuser = $(this);
    var user_id = $(newuser).attr('data-user-id');
    var user_name = $(newuser).attr('data-user-name');
    var testuser = $('.chat-group-user.clearfix.js-chat-member');
    if (testuser.length ==0) {
      addUser(user_id, user_name);
      $(newuser).parent().remove();
    } else {
      $(testuser).each(function(index, e) {
        var id = $(e).attr('id');
        if( user_id !== id ) {
        addUser(user_id, user_name);
        $(newuser).parent().remove();
        } else {
          $(newuser).parent().remove();
        }
      })
    }
  });

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
});
