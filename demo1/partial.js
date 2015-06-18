var _,
    highland = _ = require('highland')


var vals = [1, 2, 3, 4, 5, 6]

var stream = _(vals)

var squareStream = _.map((val)=> val * val)

var mapped = squareStream(stream)

mapped.pull((err, val)=> console.log( val ))
