var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express()

var Router = express.Router()

Router.get('/', function(req, res, next) {
  req.url = './index.html'
  next()
})

app.use(Router)

// 自定义接口api
const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

const apiRoutes = express.Router();
apiRoutes.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  })
})
apiRoutes.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  })
})
apiRoutes.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listen at localhost' + port)
})
