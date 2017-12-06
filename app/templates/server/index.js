// Keep it as first line (it loads nodenv)
const env = require('./common/env')
const bootServer = require('./common/server')
const log = require('./common/logger')('server')
const routes = require('./routes')

log.info('Booting app...')

const { PORT, NODE_ENV } = env
const serverOptions = {
  port: PORT,
  env: NODE_ENV,
  routes,
}
module.exports = bootServer(serverOptions)
