var _ = require('highland')
var Socket = require('socket.io')

module.exports = function chatInit(server){

  var io = new Socket(server)

  io.sockets.on('connection', function(socket){

    socket.on('message',function(data){
      io.sockets.emit('message', data)
    })

    socket.emit('greeting',{message: 'Welcome to the enter.js', nickname : 'HH.js'})
  })

}
