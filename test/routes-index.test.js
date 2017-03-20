var chai = require('chai');
var chaiHttp = require('chai-http');
var route = require('../src/routes/index');
var server = require('../src/app');
var db = require('../src/models');
var should = chai.should();
chai.use(chaiHttp);
var assert = require('assert');
// testing for user routes
describe('routes - index', function() {
    beforeEach(function() {});
    describe('index', function() {
        xit('should handle errors', function() {});
        it('Should return 200 status and call render', function(done) {
            var statusFunc = function f(x) {
                f.status = x
            };
            var renderFunc = function f(x) {
                f.template = x
            };
            route.index({}, {
                status: statusFunc,
                render: renderFunc
            });
            assert(statusFunc.status === 200);
            done();
        });
    });
});
