var _ = require('highland')

module.exports = _.errors((err, push)=> {
  console.error(err.stack)
  push( null, {err : err} )
})
