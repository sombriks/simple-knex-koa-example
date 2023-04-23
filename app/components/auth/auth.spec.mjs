import chai from "chai"
import chaiHttp from "chai-http"

chai.should();
chai.use(chaiHttp);

describe("Auth service test", () => {

  it("Should be in testing mode", done => {
    if (!process.env.NODE_ENV) return done(new Error("NODE_ENV vazio"));
    process.env.NODE_ENV.should.be.eql("test");
    done();
  })

  it("should login", async () => {
  })

  it("should create account", async () => {

  })

  it("should encrypt", async () => {

  })


  it("should decrypt", async () => {

  })

})