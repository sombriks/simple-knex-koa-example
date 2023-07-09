import chai, {expect} from "chai"
import chaiHttp from "chai-http"
import {app} from "../../main.mjs";
import {verify} from "../../configs/encryption.mjs";

chai.should();
chai.use(chaiHttp);

describe("Authors service test", () => {

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

  it("Shpuild save a new Author", done => {
    const newAuthor = {
      name: "Neil Gaiman",
    }
    chai
      .request(app.callback())
      .post("/authors")
      .send(newAuthor)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.an("object")
        done();
      });
  })
})
