import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../../main.mjs'
import { sign } from '../../configs/encryption.mjs'

chai.should()
chai.use(chaiHttp)

describe('Authors service test', () => {
  it('Should be in testing mode', done => {
    if (!process.env.NODE_ENV) return done(new Error('NODE_ENV vazio'))
    process.env.NODE_ENV.should.be.eql('test')
    done()
  })

  it('Should load env file', done => {
    if (!process.env.ALG) return done(new Error('ALG vazio'))
    if (!process.env.SECRET) return done(new Error('SECRET vazio'))
    done()
  })

  it('Should list authors', done => {
    chai
      .request(app.callback())
      .get('/authors')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        res.body.should.be.an('array')
        done()
      })
  })

  it('Should save a new Author', done => {
    const testUser = {
      email: 'test@test.com'
    }
    const { token } = sign(testUser)

    const newAuthor = {
      name: 'Neil Gaiman'
    }
    chai
      .request(app.callback())
      .post('/authors')
      .set('Authorization', `Bearer ${token}`)
      .send(newAuthor)
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        res.body.should.be.an('array')
        done()
      })
  })

  it('Should NOT save a new Author invalid token', done => {
    const token = 'gibberish'
    const newAuthor = {
      name: 'Neil Gaiman'
    }
    chai
      .request(app.callback())
      .post('/authors')
      .set('Authorization', `Bearer ${token}`)
      .send(newAuthor)
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(500)
        res.body.should.be.an('object')
        done()
      })
  })

  it('Should NOT save a new Author missing token', done => {
    const newAuthor = {
      name: 'Neil Gaiman'
    }
    chai
      .request(app.callback())
      .post('/authors')
      .send(newAuthor)
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(401)
        res.body.should.be.an('object')
        done()
      })
  })
})
