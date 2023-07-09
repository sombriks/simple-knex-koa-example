import chai, {expect} from "chai"
import chaiHttp from "chai-http"
import {app} from "../../main.mjs";
import {verify, encrypt, decrypt} from "../../configs/encryption.mjs";

chai.should();
chai.use(chaiHttp);

describe("Auth service test", () => {

  it("Should be in testing mode", done => {
    if (!process.env.NODE_ENV) return done(new Error("NODE_ENV vazio"));
    process.env.NODE_ENV.should.be.eql("test");
    done();
  })

  it("Should load env file", done => {
    if (!process.env.ALG) return done(new Error("ALG vazio"));
    if (!process.env.SECRET) return done(new Error("SECRET vazio"));
    done();
  })

  it("Should login", done => {
    const testUser = {
      email: "test@test.com", password: "e1e2e3e4"
    }
    chai
      .request(app.callback())
      .post("/login")
      .send(testUser)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.an("object")
        const data = verify(res.body)
        expect(data).to.be.ok
        data.email.should.be.eq(testUser.email)
        expect(data.password).to.be.undefined
        done();
      });
  })

  it("should create account", done => {
    const testUser = {
      name: "user 1", email: "test1@test.com", password: "e1e2e3e4"
    }
    chai
      .request(app.callback())
      .post("/signup")
      .send(testUser)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.an("object")
        const data = verify(res.body)
        expect(data).to.be.ok
        data.email.should.be.eq(testUser.email)
        expect(data.password).to.be.undefined
        done();
      });
  })

  it("Should encrypt", done => {
    const text = "my password"
    const iv = Buffer
      .from("known initialization vector")
      .subarray(0, 16)
    const secret = encrypt(text, iv)
    secret.should.be.eq("6b6e6f776e20696e697469616c697a61@1f0d69d2583df6dd37b5b3e2d4c8152e")
    done()
  })

  it("Should decrypt", done => {
    const secret = "6b6e6f776e20696e697469616c697a61@1f0d69d2583df6dd37b5b3e2d4c8152e"
    const original = decrypt(secret)
    original.should.be.eq("my password")
    done()
  })

})
