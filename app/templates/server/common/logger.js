const pino = require('pino')

const {
  APP_ID,
  LOG_LEVEL,
  NODE_ENV,
} = require('./env')

const pinoInstance = pino({
  name: APP_ID,
  level: LOG_LEVEL,
  timestamp: (NODE_ENV !== 'development'),
  messageKey: 'message',
  base: {
    hostname: null,
    project: APP_ID,
    env: NODE_ENV,
  },
})

module.exports = (module) => pinoInstance.child({ module })
