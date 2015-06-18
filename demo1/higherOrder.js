var _,
    highland = _ = require('highland')


var vals = [1, 2, 3, 4, 5, 6]
var vals2 = [1, 2, 3, 4, 5, 6]

var stream = _(vals)
var stream2 = _(vals2)

console.log(stream._incoming)
console.log(stream2._incoming)

var mult = _.map( (ops)=> ops[0] * ops[1])

// mult( _(stream).zip(stream2) ).each(_.log)
_(stream).zip(stream2).through(mult).each(_.log)
