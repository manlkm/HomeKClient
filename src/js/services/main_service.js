var myApp = angular.module('HomeKClient.controllers.Main');

myApp.service('mainService', function($http) {
    return {
        getNextSong: function() {
            return $http.get(homeKclientUrl+"next/"+uid).then(function(response) {
                console.log("data is back");
                return response.data;
            });
        },

        removeFirstSong: function() {
            return $http.delete(homeKclientUrl+"song/"+uid).then(function(response) {
                return response.data;
            });
        },

        getCommand: function() {
        	//console.log("homeKclientUrl: " + homeKclientUrl);
        	//console.log("uid: " + uid);
            return $http.get(homeKclientUrl+"command/"+uid).then(function(response) {
                return response.data;
            });
        },

        updateCommand: function(cmd) {
        	return $http.put(homeKclientUrl+"command", 
        		{
					"uid": uid,
					"cmd": cmd
				},
        		{
        			headers: {
				        'Content-Type': 'application/json'
				      },
        		}
        		).then(function (response) {
					console.log(response.data);
					return response;
			}, function (response) {
				console.log("error when calling updating command");
			    console.log(response.data);
			});

        }
    };
});
