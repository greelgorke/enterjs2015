var _ = require('highland');

module.exports = _.curry(function(streamOfResponseObjects, streamOfResponseDataStreams){
  return streamOfResponseDataStreams
    .zip(streamOfResponseObjects)
    .map( (pair)=>{
      let [ctx, res] = pair
      if (ctx.err) {
        res.writeHead(404, ctx.message)
        res.end(ctx.err.stack)
        return { result : 'Served with 404', err: ctx.err}
      } else {
        ctx.pipe(res)
        return {result : 'Served with 200'}
      }
    })
})
