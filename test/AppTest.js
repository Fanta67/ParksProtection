import request from 'request';
import chai from 'chai';

var expect = chai.expect;
describe("Website", function() {

  describe("Homepage", function() {

    var url = "https://parkprotection.me/";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it("expect no error returned", function(done) {
      request(url, function(error, response, body) {
        expect(error).to.equal(null);
        done();
      });
    });
    it("verify that homepage is loading properly", function(done) {
      request(url, function(error, response, body) {
        expect(body).to.not.equal(null);
        done();
      });
    });

  });
  
  describe("Search", function() {

    var url = "https://parkprotection.me/search/bird";

    it("verify that search is loading properly", function(done) {
      request(url, function(error, response, body) {
        expect(body).to.not.equal(null);
        done();
      });
    });

  });

  describe("Parks", function() {
    describe("model", function() {

      var url = "https://parkprotection.me/Parks";
  
      it("verify that parks model page is loading properly", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.not.equal(null);
          done();
        });
      });
  
    });
    describe("model search", function() {

      var url = "https://parkprotection.me/Parks/search/yellowstone";
  
      it("verify that parks model search page is loading properly", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.not.equal(null);
          done();
        });
      });
  
    });
    describe("instance", function() {

      var url = "https://parkprotection.me/Parks/abli";
  
      it("verify that parks instance page is loading properly", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.not.equal(null);
          done();
        });
      });
  
    });
  });

  describe("Plants", function() {
    describe("model", function() {

      var url = "https://parkprotection.me/Plants";
  
      it("verify that plants model page is loading properly", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.not.equal(null);
          done();
        });
      });
  
    });
    describe("model search", function() {

      var url = "https://parkprotection.me/Plants/search/fern";
  
      it("verify that plants model search page is loading properly", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.not.equal(null);
          done();
        });
      });
  
    });
    describe("instance", function() {

      var url = "https://parkprotection.me/Plants/1846";
  
      it("verify that plants instance page is loading properly", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.not.equal(null);
          done();
        });
      });
  
    });
  });

  describe("Animals", function() {
    describe("model", function() {

      var url = "https://parkprotection.me/Animals";
  
      it("verify that animals model page is loading properly", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.not.equal(null);
          done();
        });
      });
  
    });
    describe("model search", function() {

      var url = "https://parkprotection.me/Animals/search/fish";
  
      it("verify that animals model search page is loading properly", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.not.equal(null);
          done();
        });
      });
  
    });
    describe("instance", function() {

      var url = "https://parkprotection.me/Animals/50";
  
      it("verify that animals instance page is loading properly", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.not.equal(null);
          done();
        });
      });
  
    });
  });

  describe("About", function() {

    var url = "https://parkprotection.me/About";

    it("verify that homepage is loading properly", function(done) {
      request(url, function(error, response, body) {
        expect(body).to.not.equal(null);
        done();
      });
    });

  });
});
