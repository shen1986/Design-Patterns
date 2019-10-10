const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const path = require('path')
const atob = require('atob')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

registerChapter2Router()

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function registerChapter2Router () {
  router.get('/chapter2/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}
