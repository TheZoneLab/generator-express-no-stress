const express = require('express')
const controller = require('./controller')

module.exports = express
  .Router()
  .post('/', controller.create)
  .get('/', controller.all)
  .get('/:id', controller.byId)
