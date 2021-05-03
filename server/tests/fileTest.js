const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../index");

describe("file routes", () => {
  it("should GET all files at /uploads", (done) => {
    request(app)
      .get("/uploads")
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it("should POST a file at /upload", (done) => {
    request(app)
      .post("/upload")
      .field("title", "test upload")
      .field("description", "test description")
      .attach("file", __dirname + "/test.jpeg")
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it("will not GET an image that doesn't exist", (done) => {
    request(app)
      .get("/uploads/doesntexist")
      .end((err, res) => {
        expect(res.status).to.eq(400);
        done();
      });
  });
});
