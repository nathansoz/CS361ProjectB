var chai = require('chai');
var chaiHttp = require('chai-http');
var route = require('../src/routes/application');
var server = require('../src/app');
var db = require('../src/models');
var should = chai.should();
chai.use(chaiHttp);
var assert = require('assert');
// testing for user routes
describe('routes - application', function() {
    beforeEach(function() {});
    describe('isAuthenticated', function() {
        xit('should handle errors', function() {});
        it('calls the next func if authenticated', function(done) {
          var setByNext = 0;
          var next = () => {setByNext = 1;};
          var req = {};
          req.isAuthenticated = () => true;
          route.IsAuthenticated(req, {}, next);
          assert(setByNext === 1);
          done();
        });
    });
    describe('destroySession', function() {
        xit('logs the user out / destroys the session', function(done) {
            var session = require('express-session');
            console.log(session.logOut);
            route.destroySession({
              session: 'test'
            }, {});
            assert(sessionFunc.session === null);
            done();
        });
        it('redirects to the homepage', function(done) {
            chai.request(server).get('/logout').end((err, res) => {
                res.redirects[0].match(/.*\/$/);
                done();
            });
        });
    });
});
