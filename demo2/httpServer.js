var http = require('http')
var url = require('url')

var _, highland = _ = require('highland')

var db = new Map()

var server = http.createServer()

var _server = _('request', server, ['req', 'res'])

var requests = _server.fork().pluck('req').doto(()=> console.log(' db ', db))
var responds = _server.fork().pluck('res')

// lets do a CQRS thing
var posts = requests.fork().where( { method :'POST' })

var gets = requests.fork().where( { method: 'GET' })

server.listen(3000, (err)=> console.log( err ? err : 'Running on 3000') )


var postsHandled = posts.map( (req)=> {
  let key = req.url
  _(req).toArray( (body)=> {
    db.set(key, body)
  } )
  return {result : _(['done'])}
})

var getsHandled = gets.map( (req)=> {
  let key = req.url
  let val = db.get(key)
  let result = []
  if ( val != null) {
    result.push(val.toString())
  }
  return {result : _(result)}
})

// for now, nothing happens...

var merged = _([postsHandled, getsHandled])
  .merge()
  .errors( (err, push)=> {
    console.error(err.stack)
    push( null, {err : err} )
  })

merged
  .zip(responds)
  .each( (pair)=> {
    let [ctx, res] = pair
    if( ctx.err) {
      res.writeHead(500)
      res.end(ctx.err.message)
    } else {
      res.writeHead(200)
      ctx.result.pipe(res)
    }
  })
