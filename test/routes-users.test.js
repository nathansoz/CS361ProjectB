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
    beforeEach(function() {
        //TODO: At some point, database connection should be mocked out.
        //db.init(function() {
            //db.sequelize.sync({
                //force: true
                //}).then(function() {
                    //require('../src/config/db-seed')(db);
            //});
        //});
    });
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
            done()
        });
    });
    describe('appointment', function() {
        xit('handles async errors from the database', function(done) {
            // body...
            done();
        });
        xit('gets async data from database', function(done) {
            // body...
            done();
        });
        xit('renders the correct data', function(done) {
            done();
        });
    });
    describe('appointmentNew', function() {
        xit('handles async errors from the database', function(done) {
            // body...
            done();
        });
        it('successfully indexes into listed appointments', function(done) {
            chai.request(server).get('/appointment/1').end((err, res) => {
                assert(res.status === 200);
                done();
            });
        });
        xit('renders the correct data', function(done) {
            done();
        });
    });
});
