const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const http = require('http')
const cookieParser = require('cookie-parser')
const log = require('./logger')('server')
const env = require('./env')
const swaggerify = require('./swagger')

const app = express()
const { PORT, SESSION_SECRET, NODE_ENV } = env

module.exports = function bootServer (options) {
  const { routes } = options
  const port = options.port || PORT
  const rootPath = path.normalize(`${__dirname}/../..`)
  app.disable('x-powered-by')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser(SESSION_SECRET))
  app.use(express.static(`${rootPath}/public`))
  if (NODE_ENV === 'development') swaggerify(app)
  routes(app)
  http.createServer(app).listen(port, (err) => {
    if (!err) {
      log.info(`Up and running in '${NODE_ENV}' on port: ${PORT}`)
    } else {
      log.error('Fail to boot server', err)
    }
  })
  return app
}
