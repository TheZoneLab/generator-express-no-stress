const examplesRouter = require('./api/controllers/examples/router')

module.exports = function routes (app) {
  app.use('<%= apiRoot %>/examples', examplesRouter)
}
