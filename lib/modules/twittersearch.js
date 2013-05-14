var OAuth       = require('oauth').OAuth;
var querystring = require('querystring');
var twitconfig 	= require('../../twitter.config');

// authentication for other twitter requests
var twitterOAuth = new OAuth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	twitconfig.twitter.consumerKey,
	twitconfig.twitter.consumerSecret,
	"1.0",
	null,
	"HMAC-SHA1"
);

exports.run = function(params, cb) {

	var parameters = querystring.stringify({
		q: params.searchterms.split(',').join(' OR '),
		result_type: 'mixed',
		count: 100,
		include_entities: true
	});

	twitterOAuth.getProtectedResource('https://api.twitter.com/1.1/search/tweets.json?' + parameters, "GET", twitconfig.twitter.token, twitconfig.twitter.secret,
		function (err, data, res){
			if(err) return console.log(err);

			data = JSON.parse(data);
			var tweets = data.statuses;

			cb({"tweets": tweets});
		}
	);
};


exports.definition = {
	"name": "twittersearch",
	"category": "Sources",
	"container": {
		"icon": "/images/icons/building_go.png",
      "xtype": "WireIt.TextareaContainer",
		"title": "Twitter Search",
		"fields": [
			{"type": "text", "name": "searchterms", "wirable": true }
		],
		"terminals": [
		   {"name": "tweets", "direction": [0,1], "offsetPosition": {"left": 86, "bottom": -15}, "ddConfig": {
             "type": "output",
             "allowedTypes": ["input"]
          }
         }
	   ]
   }
};

