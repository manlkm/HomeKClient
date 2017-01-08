var myApp = angular.module('HomeKClient.controllers.Main', []);


myApp.controller('MainController', function($scope, $http, $interval, mainService){
  myPlayer = null;

  $scope.$on('$viewContentLoaded', function(){
  	//login
  	/*$http.post(homeKclientUrl+'login', '{"uid": '+uid+'}').then(function(response){
  		console.log(response.data);
  	});*/

  	$interval(function(){
  		//console.log("get command");
  		mainService.getCommand().then(function (commands){
    		if(commands != null){
    			for(var i=0;i<commands.length; i++){
    				if(commands[i] == 'stop'){
    					console.log('stop');
    					myPlayer.pause();

              mainService.removeFirstSong().then(function (response){
                console.log('first song removed');
              });
              
    					console.log('get next song');
    					mainService.updateCommand('stop').then(function (response){
    						console.log('response.data.result: ' + response.data.result);
				    		if(response != null && response.data.result == 'success'){
				    			//if stopped successfully, call next song
				    			mainService.getNextSong().then(function (songs){
					        		if(songs != null){
					        			console.log("next song");
					        			console.log(songs);
					        			myPlayer.src({ type: songs.sources.type, src: "http://"+songs.sources.src })
							  			myPlayer.autoplay(true);
					        		}
					        		else{
					        			console.log('songs is null');
					        		}
					        	});
				    		}
				    	});
    				}
    			}
    		}
    		else{
    			console.log('command is null');
    		}
    	});
  	}, 3000);

    myPlayer = videojs('my-player');
  	mainService.getNextSong().then(function (songs) {
	    if(songs != null){
	      console.log("initializing songs");

	  	  myPlayer = videojs('my-player');	
  		  myPlayer.src({ type: songs.sources.type, src: "http://"+songs.sources.src })
  		  myPlayer.autoplay(true);

  		  myPlayer.ready(function(){
  			this.play();
		  });

		  myPlayer.on('ended', function() {
        	console.log("ended");

          mainService.removeFirstSong().then(function (response){
              console.log('first song removed');
           });

        	mainService.getNextSong().then(function (songs){
        		if(songs != null){
        			console.log("next song");
        			console.log(songs);
        			myPlayer.src({ type: songs.sources.type, src: "http://"+songs.sources.src })
		  			  myPlayer.autoplay(true);
        		}
        		else{
        			console.log('songs is null');
        		}
        	});
		  	
		  });
	   }
	   else{
	   	console.log("no initialized song");
	   }
	});
	  
  });

});

