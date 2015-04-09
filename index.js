var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 55be538130c3ee8060dc980fc485e2b6373e9bf3
	host: '0.0.0.0',
	port: 8080,
  routes: {
    cors: true
  }
<<<<<<< HEAD
});

var plugins = [{ register: require('./routes/quotes.js') }];

server.register(plugins, function (err) {
  if (err) { throw err; }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
=======
	host: 'localhost',
	port: 8000
});

server.route({
	method: 'GET',
	path: '/hello',
	handler: function(request, reply) {
		reply("Hello World");
	}
>>>>>>> f3269ce54baf80f56421bc1467e844e33fa77359
=======
});

var plugins = [{ register: require('./routes/quotes.js') }];

server.register(plugins, function (err) {
  if (err) { throw err; }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
>>>>>>> 55be538130c3ee8060dc980fc485e2b6373e9bf3
});

server.start();