import pino from 'pino'

const {
  APP_ID,
  LOG_LEVEL,
  NODE_ENV,
} = process.env

const logger = (name) => pino({
  name,
  level: LOG_LEVEL,
  prettyPrint: (NODE_ENV === 'development'),
  timestamp: (NODE_ENV !== 'development'),
  base: {
    hostname: null,
    project: APP_ID,
    env: NODE_ENV,
  },
})

export default logger
