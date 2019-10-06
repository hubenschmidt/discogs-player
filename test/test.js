// import chai from "chai";
// import chaiHttp from "chai-http";
// import "chai/register-should";
// import app from "../server.js";

const chai = require("chai");
const chaiHttp = require("chai-http")
const app = require('../server.js');
require("chai/register-should")

chai.use(chaiHttp);
const { expect } = chai;

describe("Testing the record endpoints:", () => {
  it("It should create a record", done => {
    const record = {
      title: "First Awesome record",
      price: "$9.99",
      description: "This is the awesome record"
    };
    chai
      .request(app)
      .post("/api/v1/records")
      .set("Accept", "application/json")
      .send(record)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          title: record.title,
          price: record.price,
          description: record.description
        });
        done();
      });
  });

  it("It should not create a record with incomplete parameters", done => {
    const record = {
      price: "$9.99",
      description: "This is the awesome record"
    };
    chai
      .request(app)
      .post("/api/v1/records")
      .set("Accept", "application/json")
      .send(record)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("It should get all records", done => {
    chai
      .request(app)
      .get("/api/v1/records")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property("id");
        res.body.data[0].should.have.property("title");
        res.body.data[0].should.have.property("price");
        res.body.data[0].should.have.property("description");
        done();
      });
  });

  it("It should get a particular record", done => {
    const recordId = 1;
    chai
      .request(app)
      .get(`/api/v1/records/${recordId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property("id");
        res.body.data.should.have.property("title");
        res.body.data.should.have.property("price");
        res.body.data.should.have.property("description");
        done();
      });
  });

  it("It should not get a particular record with invalid id", done => {
    const recordId = 8888;
    chai
      .request(app)
      .get(`/api/v1/records/${recordId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find record with the id ${recordId}`);
        done();
      });
  });

  it("It should not get a particular record with non-numeric id", done => {
    const recordId = "aaa";
    chai
      .request(app)
      .get(`/api/v1/records/${recordId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should update a record", done => {
    const recordId = 1;
    const updatedRecord = {
      id: recordId,
      title: "Updated Awesome record",
      price: "$10.99",
      description: "We have updated the price"
    };
    chai
      .request(app)
      .put(`/api/v1/records/${recordId}`)
      .set("Accept", "application/json")
      .send(updatedRecord)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedRecord.id);
        expect(res.body.data.title).equal(updatedRecord.title);
        expect(res.body.data.price).equal(updatedRecord.price);
        expect(res.body.data.description).equal(updatedRecord.description);
        done();
      });
  });

  it("It should not update a record with invalid id", done => {
    const recordId = "9999";
    const updatedRecord = {
      id: recordId,
      title: "Updated Awesome record again",
      price: "$11.99",
      description: "We have updated the price"
    };
    chai
      .request(app)
      .put(`/api/v1/records/${recordId}`)
      .set("Accept", "application/json")
      .send(updatedRecord)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Cannot find record with the id: ${recordId}`);
        done();
      });
  });

  it("It should not update a record with non-numeric id value", done => {
    const recordId = "ggg";
    const updatedRecord = {
      id: recordId,
      title: "Updated Awesome record again",
      price: "$11.99",
      description: "We have updated the price"
    };
    chai
      .request(app)
      .put(`/api/v1/records/${recordId}`)
      .set("Accept", "application/json")
      .send(updatedRecord)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please input a valid numeric value");
        done();
      });
  });

  it("It should delete a record", done => {
    const recordId = 1;
    chai
      .request(app)
      .delete(`/api/v1/records/${recordId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it("It should not delete a record with invalid id", done => {
    const recordId = 777;
    chai
      .request(app)
      .delete(`/api/v1/records/${recordId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have
          .property("message")
          .eql(`Record with the id ${recordId} cannot be found`);
        done();
      });
  });

  it("It should not delete a record with non-numeric id", done => {
    const recordId = "bbb";
    chai
      .request(app)
      .delete(`/api/v1/records/${recordId}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have
          .property("message")
          .eql("Please provide a numeric value");
        done();
      });
  });
});
