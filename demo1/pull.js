var _,
    highland = _ = require('highland')


var vals = [1, 2, 3, 4, 5, 6]

var stream = _(vals)


console.log(stream.paused)

console.log(stream._incoming)

stream.pull((err, val)=> console.log( val ))

console.log(stream._incoming)
