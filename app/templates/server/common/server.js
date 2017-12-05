import Express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import cookieParser from 'cookie-parser'
import swaggerify from './swagger'
import log from './logger'

const app = new Express()
const {
  PORT,
  NODE_ENV,
  SESSION_SECRET,
} = process.env

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`)
    app.set('appPath', `${root}client`)
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cookieParser(SESSION_SECRET))
    app.use(Express.static(`${root}/public`))
  }

  router(routes) {
    swaggerify(app, routes)
    return this
  }

  listen(port = PORT) {
    http.createServer(app).listen(port, () => {
      log.info(`Up and running in '${NODE_ENV}' on port: ${PORT}`)
    })
    return app
  }
}
