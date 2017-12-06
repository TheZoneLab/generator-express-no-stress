const split = require('split2')
const pump = require('pump')
const through = require('through2')
const pino = require('pino')

const LEVEL_COLORS = {
  fatal: '\x1b[31m', // red
  error: '\x1b[31m', // red
  warn: '\x1b[33m', // yellow
  info: '\x1b[32m', // green
  debug: '\x1b[34m', // blue
  trace: '\x1b[35m', // magenta
}

const devTransport = through.obj((chunk, enc, cb) => {
  if (chunk.message) {
    const level = chunk.level || 400
    const levelLabel = pino.levels.labels[level]
    const levelColor = LEVEL_COLORS[levelLabel]
    const module = chunk.module || 'unknown'
    // eslint-disable-next-line no-console
    console.log(`${levelColor}%s - [%s] \x1b[0m%s`, levelLabel.toUpperCase(), module, chunk.message)
  }
  cb()
})

function deserialize (buff) {
  try {
    return JSON.parse(buff)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('[out-of-pino] ', buff)
    return {}
  }
}

pump(process.stdin, split(deserialize), devTransport)
