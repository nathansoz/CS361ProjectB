var chai = require('chai');
var chaiHttp = require('chai-http');
var user = require('../src/routes/users');
var server = require('../src/app');
var db = require('../src/models');
var should = chai.should();
chai.use(chaiHttp);
// testing for user routes
describe('routes - user', function() {
    beforeEach(function() {
        db.sequelize.sync({
            force: true
        }).then((data) => {
            console.log(data);
            require('../src/config/db-seed')(db);
        });
    });
    describe('browse', function() {
        xit('should handle errors', function() {});
        it('should GET all items', function(done) {
            chai.request(server).get('/browse').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.length.should.be.eql(0);
                done();
            });
        });
        xit('should not error on empty data', function(done) {
            done();
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
        xit('successfully async updates the database', function(done) {
            // body...
            done();
        });
        xit('renders the correct data', function(done) {
            done();
        });
    });
});
