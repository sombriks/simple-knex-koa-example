import chai from 'chai'
import chaiHttp from 'chai-http'

import { app } from './main.mjs'

chai.should()
chai.use(chaiHttp)

describe('Basic api checks', () => {
  it('Should be in testing mode', done => {
    if (!process.env.NODE_ENV) return done(new Error('NODE_ENV not set'))
    process.env.NODE_ENV.should.be.eql('test')
    done()
  })

  it('should return status ONLINE', done => {
    chai
      .request(app.callback())
      .get('/status')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        res.text.should.be.eql('ONLINE')
        done()
      })
  })
})
