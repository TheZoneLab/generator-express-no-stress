# generator-express-no-stress *(zone version)*

> This generator (forked from https://github.com/cdimascio/generator-express-no-stress) is the basic API service that should be used for projects in iA Zone.

## Install
*Requires Node 6 or greater*

`npm install -g yo git+http://git@github.com:TheZoneLab/generator-express-no-stress.git`

## Scaffold

`yo express-no-stress myapp`

## Run
#### Run in *development* mode:

```
cd myapp
npm run start:dev
```

#### Run in *production* mode:

```
npm run compile
npm start
```

## Test

```
npm test
```

## Debug

Run `npm run start:debug` and attach your favourite inspector!

# Try it!

- Interactive API doc at [http://localhost:<PORT>/api-explorer](http://localhost:<PORT>/api-explorer)
- Landing page at [http://localhost:<PORT>](http://localhost:<PORT>)


## Use Yarn

```
# scaffold
yo express-no-stress myapp --yarn

# start
cd myapp
npm start
```

## CLI Options

```shell
yo express-no-stress [appname] [--yarn]
```

| Option | default | Description |
| --- | --- | --- |
| `appname` | myapp | The application folder |
| `--yarn` | | Use the [`yarn`](https://yarnpkg.com) package manager, instead of `npm` |

## What you get!

- [Express.js](www.expressjs.com) - Fast, unopinionated
, minimalist web framework for Node.js
- [Babel.js](https://babeljs.io/) - Use new syntax, right now without waiting for support
- [Pino](https://github.com/pinojs/pino) - Extremely fast node.js logger, inspired by Bunyan. It also includes a shell utility to pretty-print its log files
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects
- [Backpack](https://github.com/palmerhq/backpack) -  a minimalistic build system for Node.js projects.
- [ESLint](http://eslint.org/) - a pluggable linting utility for JavaScript and JSX
- [Swagger](http://swagger.io/) - is a simple yet powerful representation of your RESTful API.
- [SwaggerUI](http://swagger.io/) - dynamically generate beautiful documentation and sandbox from a Swagger-compliant API


### API Validation

Simply describe your APIs with Swagger and automagically get for free:
- Interactive documentation
- API validation

#### Interactive API Doc
![](https://raw.githubusercontent.com/cdimascio/generator-express-no-stress/master/assets/interactive-doc1.png)


#### API Validation!
Oops! I the API caller forgot to pass a `name` field, no stress, we've got this!

![](https://raw.githubusercontent.com/cdimascio/generator-express-no-stress/master/assets/api-validation.png)



### Structured Logging

Structured logging out of the box!

#### raw

![](https://raw.githubusercontent.com/cdimascio/generator-express-no-stress/master/assets/logging-raw.png)

#### pretty

Structured logging pretty printed by default - great for dev!

![](https://raw.githubusercontent.com/cdimascio/generator-express-no-stress/master/assets/logging-pretty.png)

### API Validation Example

Simply describe your APIs with Swagger and automatically get:
- API request validation
- Interactive documentation

### example

#### Swagger API spec

```yaml
swagger: "2.0"
info:
  version: 1.0.0
  title: myapp
  description: My cool app
basePath: /api/v1
tags:
  - name: Examples
    description: Simple example endpoints
  - name: Specification
    description: The swagger API specification

consumes:
  - application/json
produces:
  - application/json

definitions:
  ExampleBody:
    type: object
    title: example
    required:
      - name
    properties:
      name:
        type: string
        description: The example name

paths:
  /examples:
    get:
      tags:
        - Examples
      description: Fetch all examples
      responses:
        200:
          description: Returns all examples
    post:
      tags:
        - Examples
      description: Create a new example
      parameters:
        - name: example
          in: body
          description: number of items to skip
          required: true
          schema:
            $ref: "#/definitions/ExampleBody"
      responses:
        200:
          description: Returns all examples

  /examples/{id}:
    get:
      tags:
        - Examples
      parameters:
        - name: id
          in: path
          required: true
          description: The id of the entity to retrieve
          type: integer
      responses:
        200:
          description: Return the example with the specified id
        404:
          description: Example not

  /spec:
    get:
      tags:
        - Specification
      responses:
        200:
          description: Return the API specification
```

#### Invoke a POST request via the Interactive doc

![](https://raw.githubusercontent.com/cdimascio/generator-express-no-stress/master/assets/interactive-doc.png)


### Linting

express-no-stress uses [ESLint](http://eslint.org/) with a slightly modified AirBnb [base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) configuration. See `.eslintrc.json` to make modifications.
