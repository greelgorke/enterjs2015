var _,
    highland = _ = require('highland')

var vals = [1, 1, 1, 1, 1, 1]
var vals2 = [1, 2, 0, 4, 5, 6]

var stream = _(vals)
var stream2 = _(vals2)


var div = _.map( (vals) => {
  let [op1, op2] = vals

  if (op2 === 0 ) throw new Error()
  return op1/op2
})

// _(stream).zip(stream2).through(div).each(_.log)
// _(stream).zip(stream2).through(div).stopOnError(_.log).each(_.log)
// _(stream).zip(stream2).through(div).errors(_.log).each(_.log)
_(stream).zip(stream2).through(div).map( (aDiv)=> Math.pow(aDiv, 2) ).errors(_.log).each(_.log)
