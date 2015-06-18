var _,
    highland = _ = require('highland')


var vals = [1, 2, 3, 4, 5, 6]

var stream = _(vals)

var mapped = stream.map( (val)=> val * val)

console.log('stream - before', stream._incoming)
console.log('mapped - before', mapped._incoming)

mapped.pull((err, val)=> console.log( val ))

console.log('stream - after', stream._incoming)
console.log('mapped - after', mapped._incoming)
