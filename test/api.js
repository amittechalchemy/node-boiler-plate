process.env.NODE_ENV = 'testing';
const chai = require('chai');
const mognoose = require('mongoose');
let chaiHttp = require('chai-http');
const Book = require('../mognoModels/book');
let server = require('../server');
const { assert, expect } = chai;
const should = chai.should();

chai.use(chaiHttp);
describe('books', function () {
  describe('/POST book', function () {
    it('Add new Book', function (done) {
      chai
        .request(server)
        .post('/api/book')
        .send({
          title: 'Test 1',
          author: 'Amit Thakur',
          year: 2020,
          pages: 12,
        })
        .end((err, res) => {
          console.log('-->>>>', err);
          const obj = res.body;
          // try {
          // res.should.have.status(500);
          console.log('====>>>>', obj);
          expect(obj.success).to.deep.equal(false);
          // } catch (e) {
          //   console.log(e.message);
          // }
          done();
        });
    });
  });
  describe('/GET books', function () {
    it('get Book', function (done) {
      chai
        .request(server)
        .get('/api/books')
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });

  //   it('should be a string', function () {
  //     const name = 'Amit Thakur';
  //     name.should.be.a('string');
  //     expect(name).to.be.a('string');
  //     assert.typeOf(name, 'string');
  //   });

  //   it('should match', function () {
  //     const name = 'Amit Thakur';
  //     name.should.equal('Amit Thakur');
  //     expect(name).to.equal('Amit Thakur');
  //     assert.equal(name, 'Amit Thakur');
  //   });
});
