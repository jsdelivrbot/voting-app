const expect = require('chai').expect
const request = require('supertest')

describe('Read endpoints', function () {
  var server

  beforeEach(function () {
    server = require('../bin/www')
  })

  afterEach(function () {
    server.close()
  })

  it('should respond to /', function testHomePage (done) {
    request(server)
      .get('/')
      .expect(200, done)
  })

  it('should respond to /sign-up', function testSignUp (done) {
    request(server)
      .get('/sign-up')
      .expect(200, done)
  })

  it('should respond to /login', function testlogin (done) {
    request(server)
      .get('/login')
      .expect(200, done)
  })

  it('should respond to /user-home', function testUserHome (done) {
    request(server)
      .get('/user-home')
      .expect(200, done)
  })

  it('should respond to /new-poll', function testNewPoll (done) {
    request(server)
      .get('/new-poll')
      .expect(200, done)
  })

  it('should respond to /congrats', function testCongrats (done) {
    request(server)
      .get('/congrats')
      .expect(200, done)
  })

  it('should respond to /my-polls', function testMyPolls (done) {
    request(server)
      .get('/my-polls')
      .expect(200, done)
  })

  it('should respond to /:poll', function testPoll (done) {
    request(server)
      .get('/example-poll')
      .expect(200, done)
  })

  it('should respond with 404 for everything else', function testPath (done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done)
  })
})

describe('/register endpoint', function () {
  const testUser = {
    firstName: 'Bob',
    surname: 'Smith',
    email: 'bobs4@test.com',
    password: 'testing123',
    passwordConf: 'testing123'
  }

  var server
  
  beforeEach(function () {
    server = require('../bin/www')
  })
  
  afterEach(function () {
    const User = require('../models/user')
    User.remove({'email': testUser.email}, function (error, user) {
    })
    server.close()
  })
  
  it('should respond with 302 found when a new user is registered', function testRegister(done) {
    request(server)
      .post('/register')
      .send(testUser)
      .expect(302, done)
  })
  
  it('should redirect to the /user-home page after a new user is registered', function testRegister(done) {
    request(server)
      .post('/register')
      .send(testUser)
      .expect('location', `/user-home?firstName=${testUser.firstName}`)
      .expect(302, done)
  })
})
