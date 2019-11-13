const express = require('./express')

let app = express()
let router = express.Router()

// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {

//   if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/', function (req, res) {
  res.end('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, function (req, res) {
  console.log(646);
  res.end('sss')
})

app.get('/',function(req,res){
  res.end(req.url)
})

app.listen(8080)