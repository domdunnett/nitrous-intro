exports.register = function(server, options, next) {
  
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        reply("Hello, I'm an awesome Harry Quote API Server!");
      }
    },
    //Get all quotes
    {
      method: 'GET',
      path: '/quotes',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        db.collection('quotes').find().toArray(function(err, result) {
          if (err) {throw err;}
          reply(result);
        });
        reply();
      }
    },
    //Get one quote
    {
      method: 'GET',
      path: '/quotes/{quote_id}',
      handler: function(request, reply) {
        var id = Number(request.params.quote_id);
        if (isNaN(id)) {
          return reply("That is not a valid quote ID").code(404);
        }
        reply(db[id]);
      }
    },
    //Add a new quote
    {
      method: 'POST',
      path: '/quotes',
      handler: function(request, reply) {
        db.push(request.payload);
        reply(request.payload);
      }
    },
    //Update a quote
    {
      method: 'PUT',
      path: '/quotes/{id}',
      handler: function(request, reply) {
        request.payload;
        reply(request.payload);
      }
    },
    //Delete a quote
    {
      method: 'DELETE',
      path: '/quotes/{id}',
      handler: function(request, reply) {
        if (db.length <= request.params.id) {
          return reply('No quote found.').code(404);
        }
        db.splice(request.params.id, 1);
        reply("Quote with id " + request.params.id + " has been deleted.");
      }
    },
    //Deliver a random request
    {
      method: 'GET',
      path: '/quotes/random',
      handler: function(request, reply) {
        var id = Math.floor(Math.random()*db.length);
        reply(db[id]);
      }
    },
    //Update a quote
    {
      method: 'PUT',
      path: '/quotes/{quote_id}/edit',
      handler: function(request, reply) {
        var id = Number(request.params.quote_id);
        db[id] = request.payload;
        reply(db[id]);
      }
    }
  ]);
  next();
}

exports.register.attributes = {
  name: 'quotes-route',
  version: '0.0.1'
}