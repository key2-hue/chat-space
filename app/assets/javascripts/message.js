$(function() {
  function buildHTML(message) {
    var content =  message.content ? `<p class="lower-message__content">${message.content}</P>` : "";
    var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                    ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    ${content}
                    ${image}
                  </div>
                </div>`
    return html;
  }

  function lastMessage(){
    var last = $('.message').last();
    var position = last.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    },400);
  }

 
    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html)
        document.getElementById("new_message").reset();
        lastMessage();     
      })
      .fail(function(data) {
        alert('メッセージを送信できませんでした');
      })
      .always(function(data) {
        $('.submit__button').attr('disabled',false);
      })
    })

    $('.submit__button').on('dblclick', function(e) {
      e.preventDefault();
      alert('連続では押せません');
      $.ajax ({

      })
      .always(function(data) {
        $('.submit__button').attr('disabled',false);
      })
    });



  var reloadMessages = function() {
    
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      
      var last_message_id = $('.message').last().data("id");
      
      $.ajax({
        url: location.pathname,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id} 
      })
      .done(function(messages) {   
        var insertHTML = '';
        messages.forEach(function(message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        });
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        
      });
    }
  };
  setInterval(reloadMessages, 2000);
});

