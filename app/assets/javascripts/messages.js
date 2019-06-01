$(document).on('turbolinks:load', function(){
    function buildHTML(message){
        var addImage = '';
        var image_url = (message.image_url)? `<image class="lower-message_image" src="${message.image_url}">`:"";
        if (message.image.url) {
            addImage = `<img src="${message.image.url}" class="lower-message__image"`;
        }
        var html = `
          <div class="chat__contents__content" data-message-id="${message.id}">
            <div class="chat__contents__content-top" data-message-id="${message.id}">
              <div class="chat__contents__content-top__user">${message.name}</div>
              <div class="chat__contents__content-top__timestamp">${message.date}</div>
            </div>
            <div class="chat__contents__content__text">
              <p class="chat__contents__content__text">
                ${message.body}
              </p>
                ${message.body}
            </div>
          </div>`;
        return html;
    }

    $('.new_message').on('submit', function(e) {
        e.preventDefault();
        var formdata = new FormData(this);
        $.ajax({
            url: location.href,
            type: 'POST',
            dataType: 'json',
            contentType: false,
            processData: false
        })
        .done(function(message) {
            var html = buildHTML(message);
            console.log(html);
            $('.chat__contents').append(html);
            $('.from__message').val('');
            $('.btn').prop('disabled', false);
            $('.chat').animate({scrollTop: $('.chat__contents')[0].scrollHeight}, 'fast');
            $('.hidden').remove();
        })
        .fail(function(message) {
            alert('メッセージを入力してください');
        })
    })

    // 自動更新
    $(function() {
        $(function() {
            if (location.pathname.match(/\/groups\/\d+\/messages/)) {
                setInterval(update, 5000);
            }
        });
        function update() {
            if($('.chat__contents__content')[0]){
                var message_id = $('.chat__contents__content:last').data('message-id');
            } else {
                return false
            }

            $.ajax({
                url: location.href,
                type: 'GET',
                data: { id : message_id },
                dataType: 'json'
            })
            .done(function(data){
                if (data.lenght){
                    $.each(data, function(i, data){
                        var html = buildHTML(data);
                        $('.chat__contents').append(html)
                    })
                }
            })
            .fail(function(){
                alert('自動更新に失敗しました')
            })
        }
    })
})
