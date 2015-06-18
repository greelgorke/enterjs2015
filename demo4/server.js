var http = require('http')
var _, highland = _ = require('highland')

var server = http.createServer()

var _server = _('request', server, ['req', 'res'])

require('./chat')(server)

server.listen(3000, (err)=> console.log( err ? err : 'Running on 3000') )

var reqIntercept = require('./reqIntercept')

_server.fork().pluck('req')
  // .doto((req)=> console.log('will serve', req.url))
  .through( reqIntercept.enter )
  .through( require('./files')(__dirname))
  .through( require('./error'))
  .through( require('./respond')( _server.fork().pluck('res') ) )
  .through( reqIntercept.exit )
  .done()
