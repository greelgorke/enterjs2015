(function(){
  var messageBox = document.querySelector('.messages')
    , nicknameInput = document.querySelector('.nicknameinput')
    , messageInput = document.querySelector('.postinput')
    , socket = io.connect()

  function addPost(data) {
    var li = document.createElement('LI')
      , prefix = data.nickname
    li.innerHTML = prefix + ': '+ data.message
    messageBox.appendChild(li)
  }

  messageInput.form.addEventListener('submit', function(e){
    e.preventDefault()
    var post = messageInput.value
    var nickname = nicknameInput.value

    messageInput.value = ''

    if(post){
      var message = {message:post, nickname: nickname}
      // addPost(message)
      socket.emit('message',message)
    }

    messageInput.focus()
    return false
  })

  socket.on('greeting', addPost)
  socket.on('message', addPost)
})()
