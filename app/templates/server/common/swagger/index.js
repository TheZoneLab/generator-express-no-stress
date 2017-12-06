const middleware = require('swagger-express-middleware')
const path = require('path')
const env = require('../env')

module.exports = function setupMiddleware (app) {
  middleware(path.join(__dirname, 'Api.yml'), app, (err, mw) => {
    // Enable Express' case-sensitive and strict options
    // (so "/entities", "/Entities", and "/Entities/" are all different)
    app.enable('case sensitive routing')
    app.enable('strict routing')

    app.use(mw.metadata())
    app.use(mw.files({
      // Override the Express App's case-sensitive
      // and strict-routing settings for the Files middleware.
      caseSensitive: false,
      strict: false,
    }, {
      useBasePath: true,
      apiPath: env.SWAGGER_API_SPEC,
      // Disable serving the "Api.yml" file
      // rawFilesPath: false
    }))

    app.use(mw.parseRequest({
      // Configure the cookie parser to use secure cookies
      cookie: {
        secret: env.SESSION_SECRET,
      },
      // Don't allow JSON content over 100kb (default is 1mb)
      json: {
        limit: env.REQUEST_LIMIT,
      },
    }))

    // These two middleware don't have any options (yet)
    app.use(
      mw.CORS(),
      mw.validateRequest())

    // Error handler to display the validation error as HTML
    app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars, no-shadow
      res.status(err.status || 500)
      res.send(
        `<h1>${err.status || 500} Error</h1>` +
        `<pre>${err.message}</pre>`)
    })
  })
}
