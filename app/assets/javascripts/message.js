$(function() {
  function buildHTML(message) {
    var content =  message.content ? `<p class="lower-message__content">${message.content}</P>` : "";
    var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : "";
    var html = `<div class="message">
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
      $('.submit__type').val('')
      console.log(data); 
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

});