/* eslint-env mocha */

const request = require('supertest')
const Server = require('../server')

const { assert } = require('chai')

describe('Examples', () => {
  it('should get all examples', () =>
    request(Server)
      .get('<%= apiRoot %>/examples')
      .expect('Content-Type', /json/)
      .then(r => {
        assert.isArray(r.body)
        assert.lengthOf(r.body, 2)
      }))

  it('should add a new example', () =>
    request(Server)
      .post('<%= apiRoot %>/examples')
      .send({ title: 'hello world', author: 'human' })
      .expect('Content-Type', /json/)
      .then(r => {
        assert.isObject(r.body)
        assert.propertyVal(r.body, 'title', 'hello world')
        assert.propertyVal(r.body, 'author', 'human')
      }))

  it('should get an example by id', () =>
    request(Server)
      .get('<%= apiRoot %>/examples/2')
      .expect('Content-Type', /json/)
      .then(r => {
        assert.isObject(r.body)
        assert.property(r.body, 'title')
        assert.property(r.body, 'author')
      }))
})
