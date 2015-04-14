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
      }
    },
    //Get one quote
    {
      method: 'GET',
      path: '/quotes/{quote_id}',
      handler: function(request, reply) {
        var id = encodeURIComponent(request.params.quote_id);
        var db = request.server.plugins['hapi-mongodb'].db;
        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
        var newQuote = request.payload.quote;
        
        db.collection('quotes').findOne( {"_id": ObjectID(id)}, function(err, quote) {
          if (err) { throw err; }
          reply(quote);
        });
      }
    },
    //Add a new quote
    {
      method: 'POST',
      path: '/quotes',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var newQuote = request.payload.quote;
        db.collection('quotes').insert(newQuote, function(err, writeResult) {
          if (err) { reply(Hapi.error.internal('Internal MongoDB Error', err)); }
          else { reply(writeResult); }  
        });  
      }
    },
    //Update a quote
    {
      method: 'PUT',
      path: '/quotes/{quote_id}/edit',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var id = encodeURIComponent(request.params.quote_id);
        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
        var newQuote = request.payload.quote;
        
        db.collection('quotes').update({"_id": ObjectID(id)}, { $set: newQuote }, function(err,         result) {
          if (err) { throw err; }
          reply(newQuote);
        });
        reply(newQuote);
      }
    },
    //Delete a quote
    {
      method: 'DELETE',
      path: '/quotes/{quote_id}',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var id = encodeURIComponent(request.params.quote_id);
        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
        
        db.collection('quotes').remove( {"_id": ObjectID(id)}, true );
        reply("Quote with id " + id + " has been deleted.");
      }
    },
    //Deliver a random request
    {
      method: 'GET',
      path: '/quotes/random',
      handler: function(request, reply) {
        var quoteArray = [];
        var db = request.server.plugins['hapi-mongodb'].db;
        db.collection('quotes').find().toArray(function(err, result) {
          if (err) {throw err;}
          else {
            quoteArray = result;
            var randomId = Math.floor(Math.random()*quoteArray.length);
            reply(quoteArray[randomId]);
          }
        });
      }   
    },
    //Request an author query
    {
      method: 'GET',
      path: '/quotes/search/{searchQuery}',
      handler: function(request, reply) {
        var query = { $text: { $search: request.params.searchQuery }};
        var db = request.server.plugins['hapi-mongodb'].db;
        
        db.collection('quotes').find(query).toArray(function(err, result) {
          if (err) {throw err;}
          else {
            reply(result);
          }
        });
      }
    }
  ]);
  next();
}

exports.register.attributes = {
  name: 'quotes-route',
  version: '0.0.1'
}