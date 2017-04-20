var http = require('http');
var assert = require('assert');
var authCAS = require('../lib/auth-cas');
var config = require('./test-config.json');

it('Host must be specified', function() {
	assert.throws(
		() => {
			new authCAS();
		}, /Host must be specified/
	);
	assert.throws( 
		() => {
			new authCAS(undefined);
		}, /Host must be specified/
	);
});

it('CAS host must be specified', function() {
	assert.throws(
		() => { new authCAS('https://cashost.com')}, 
		/CAS host must be specified/
	);
});

if('Visiting the login page should redirect to the CAS server login page', function(done) {
	http.get(config.host + '/login', function(res) {
		assert.equal(res.statusCode, 302);
		var redirect = url.parse(res.headers.location);
		var expected = url.parse(config.casHost);
		var service = encodeURIComponent(config.host + '/login');
		assert.equal(redirect.protocol, expected.protocol);
		assert.equal(redirect.hostname, expected.hostname)
		assert.equal(redirect.port, expected.port);
		assert.equal(redirect.pathname, '/login');
		assert.equal(redirect.search, '?service=' + service);
	});
});