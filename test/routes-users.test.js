var chai = require('chai');
var chaiHttp = require('chai-http');
var user = require('../src/routes/users');
var server = require('../src/app');
var db = require('../src/models');
var should = chai.should();
chai.use(chaiHttp);
var assert = require('assert');
// testing for user routes
describe('routes - user', function() {
    beforeEach(function() {});
    describe('browse', function() {
        xit('should handle errors', function() {});
        it('should GET all items', function(done) {
            chai.request(server).get('/browse').end((err, res) => {
                assert(res.status === 200);
                done();
            });
        });
        it('Should return 200 status and call render', function(done) {
            var statusFunc = function f(x) { console.log(x); f.status = x };
            var renderFunc = function f(x, y) { f.data = y; f.template = x };
            user.browse({ }, { status: statusFunc, render: renderFunc });
            assert(statusFunc.status === 200);
            assert(renderFunc.data !== null);
            done();
        });
    });
    describe('appointment', function() {
        xit('should handle errors', function() {});
        xit('should GET a single item', function(done) {
          // TODO: broken becuase currently relys on hard coded data in same file?
            var req = {params: {id: 1}};
            var renderFunc = function f(x) { f.data = y; };
            user.appointment(req, { render: renderFunc });
            console.log(renderFunc.data);
            assert(renderFunc.data.length === 1);
            done();
        });
        xit('Should return 200 status and call render', function(done) {
          // TODO: broken becuase currently relys on hard coded data in same file?
            var statusFunc = function f(x) { f.status = x };
            var renderFunc = function f(x, y) { f.data = y; f.template = x };
            user.appointment({ }, { status: statusFunc, render: renderFunc });
            assert(statusFunc.status === 200);
            assert(renderFunc.data !== null);
            done();
        });
        it('successfully indexes into listed appointments', function(done) {
            chai.request(server).get('/appointment/1').end((err, res) => {
                assert(res.status === 200);
                done();
            });
        });
    });
    describe('appointmentNew', function() {
      // ROUTE NOT YET IMPLEMENTED
        xit('handles async errors from the database', function(done) {
            // body...
            done();
        });
        xit('renders the correct data', function(done) {
            done();
        });
    });
    describe('registerBank', function() {
        xit('should handle errors', function() {});
        it('Should return 200 status and call render', function(done) {
            var statusFunc = function f(x) { f.status = x };
            var renderFunc = function f(x, y) { f.data = y; f.template = x };
            user.registerBank({ }, { status: statusFunc, render: renderFunc });
            assert(statusFunc.status === 200);
            assert(renderFunc.template !== null);
            done();
        });
    });
    describe('bankNew', function() {
        xit('should display handle errors', function(done) {
          var statusFunc = function f(x) { f.status = x };
          var renderFunc = function f(x, y) { f.data = y; f.template = x };
          var errorFunc = function f(x) { f.errors = x; };
          user.bankNew({body: {}}, { status: statusFunc, render: renderFunc, errors: errorFunc });
          assert(statusFunc.status === 200);
          assert(renderFunc.template !== null);
          assert(errorFunc.errors !== null);
          done();
        });
        xit('Should return 200 status and call render', function(done) {
            var statusFunc = function f(x) { f.status = x };
            var renderFunc = function f(x, y) { f.data = y; f.template = x };
            user.bankNew({}, { status: statusFunc, render: renderFunc });
            assert(statusFunc.status === 200);
            assert(renderFunc.template !== null);
            done();
        });
    });
    describe('addInventory', function() {
        xit('should handle errors', function() {});
        xit('Should return 200 status and call render', function(done) {
            var statusFunc = function f(x) { f.status = x };
            var renderFunc = function f(x, y) { f.data = y; f.template = x };
            user.addInventory({ }, { status: statusFunc, render: renderFunc });
            assert(statusFunc.status === 200);
            assert(renderFunc.template !== null);
            done();
        });
    });
    describe('newInventory', function() {
        xit('should handle errors', function() {});
        xit('Should return 200 status and call render', function(done) {
            // NOT YET IMPLETENTED
            done();
        });
    });
    describe('swap', function() {
        xit('should handle errors', function() {});
        xit('Should return 200 status and call render', function(done) {
            var statusFunc = function f(x) { f.status = x };
            var renderFunc = function f(x, y) { f.data = y; f.template = x };
            user.swap({ }, { status: statusFunc, render: renderFunc });
            assert(statusFunc.status === 200);
            assert(renderFunc.template !== null);
            done();
        });
    });
    describe('bankSwap', function() {
        xit('should handle errors', function() {});
        xit('Should return 200 status and call render', function(done) {
            var statusFunc = function f(x) { f.status = x };
            var renderFunc = function f(x, y) { f.data = y; f.template = x };
            user.bankSwap({ }, { status: statusFunc, render: renderFunc });
            assert(statusFunc.status === 200);
            assert(renderFunc.template !== null);
            done();
        });
    });
    describe('registerNew', function() {
        xit('should handle errors', function() {});
        xit('Should return 200 status and call render', function(done) {
            var statusFunc = function f(x) { f.status = x };
            var renderFunc = function f(x, y) { f.data = y; f.template = x };
            user.registerNew({ }, { status: statusFunc, render: renderFunc });
            assert(statusFunc.status === 200);
            assert(renderFunc.template !== null);
            done();
        });
    });
});
