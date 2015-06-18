var _ = require('highland')
var fs = require('fs')

module.exports = function( root ){
  return _.pipeline(
    _.map( (req)=> root + req.url ),
    createFileStream
  )
}

var createFileStream = _.consume( (err, path, push, next)=> {
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
