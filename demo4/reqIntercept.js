var _ = require('highland')

module.exports.enter = _.doto( (req)=> console.log('serving ', req.url) )
module.exports.exit = _.doto( (result)=> console.log( result ) )
