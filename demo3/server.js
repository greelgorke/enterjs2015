var http = require('http')
var path = require('path')
var _, highland = _ = require('highland')
var fs = require('fs')

var server = http.createServer()

var _server = _('request', server, ['req', 'res'])

require('./chat')(server)

server.listen(3000, (err)=> console.log( err ? err : 'Running on 3000') )


_server.fork().pluck('req')
  // .doto((req)=> console.log('will serve', req.url))
  .map( (req)=> __dirname + req.url )
  .consume( (err, path, push, next)=> {
    if (err) {
        // pass errors along the stream and consume next value
        push(err)
        next()
    }
    else if (path === _.nil) {
        // pass nil (end event) along the stream
        push(null, path)
    }
    else {
        // pass on the value only if the value passes the predicate
        fs.stat(path, (fserr, stats)=> {
          if (fserr || stats.isFile() === false )
            push(new Error('FileNotFound'))
          else
            push(null, fs.createReadStream(path))
          next()
        })
    }
  })
  .errors((err, push)=> {
    console.error(err)
    console.error(err.stack)
    push( null, {err : err} )
  })
  .zip(
    _server.fork().pluck('res')
  )
  .each( (pair)=>{
    let [ctx, res] = pair
    if (ctx.err) {
      res.writeHead(404, ctx.message)
      res.end(ctx.err.stack)
    } else {
      ctx.pipe(res)
    }
  })
