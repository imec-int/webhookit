exports.run = function(params, cb) {
	cb({"out": "hahah"});
};


exports.definition = {
   "name": "testje",
	"category": "Sources",
   "container": {
		"icon": "/images/icons/building_go.png",
      "xtype": "WireIt.TextareaContainer",
		"title": "testje",
		"fields": [
			{"type": "text", "name": "json", "wirable": true }
		],
		"terminals": [
		   {"name": "out", "direction": [0,1], "offsetPosition": {"left": 86, "bottom": -15}, "ddConfig": {
             "type": "output",
             "allowedTypes": ["input"]
          }
         }
	   ]
   }
};

