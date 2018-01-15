var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){

	$routeProvider
		.when('/home', {
			templateUrl : 'views/home.html',
			controller : 'MainController'
		})
		.otherwise({
			redirectTo : '/home'
		});

}]);

app.controller('MainController', ['$scope', '$location', '$http', function($scope, $location, $http){
	$scope.msg = "Welcome...";
	$scope.redirectTo = function(redirect){
		$location.path('/' + redirect);
	}

	$scope.start = function(){
		var width = prompt('Enter the board width :');
		var height = prompt('Enter the board height :');
		var pieces = 10;
		var pieceLocations = [];
		var piecesConquredByMario = 0;

		var piecesPlaced = 0;
		var marioPlaced = false;
		var marioLocation;
		var marioMovesCount = 0;
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		
		for(var i = 0; i < width; i++){
			pieceLocations[i] = new Array(height);
		}
		for(var i = 0; i < width; i++){
			for(var j = 0; j < height; j++){	
				ctx.beginPath();
				ctx.lineWidth="2";
				ctx.strokeStyle="white";
				ctx.rect(i * 50 , j * 50, 50, 50);
				ctx.stroke();

				pieceLocations[i][j] = 0;
			}
		}

		for(var i = 0; i < width; i++){
			for(var j = 0; j < height; j++){	
				// place the pieces
			    var pieceFlag = Math.round(Math.random());
			    // console.log(pieceFlag);
			    if(pieceFlag == 1 && piecesPlaced < pieces){
			    	// pieceLocations.push({x : i * 50, y : j * 50});
			    	pieceLocations[i][j] = 1;
			    	piecesPlaced++;

			    	// print the pieces
			    	ctx.beginPath();
					ctx.lineWidth="2";
					ctx.strokeStyle="black";
					ctx.fillRect(i * 50 , j * 50, 50, 50);
					ctx.stroke();
			    }
			    else if(pieceFlag == 0 && marioPlaced == false && piecesPlaced > pieces / 2){
			    	ctx.strokeStyle="yellow";
			    	ctx.beginPath();
					ctx.lineWidth="2";
	
					ctx.rect(i * 50 , j * 50, 50, 50);
					ctx.stroke();

					marioPlaced = true;
					marioLocation = {x : i * 50, y : j * 50};
					console.log("Mario : " + marioLocation.x + " , " + marioLocation.y);
			    }
			}
		}

		document.addEventListener('keydown', function(event){
			// console.log(event.keyCode);
			// console.log("keypress");
			moveMario(event.keyCode);


		});
		function moveMario(code){
			// console.log("code is : " + code);

			ctx.strokeStyle="white";
	    	ctx.beginPath();
			ctx.lineWidth="2";
			ctx.rect(marioLocation.x , marioLocation.y, 50, 50);
			ctx.fillStyle = "#eee";
			ctx.fill();

			if(code == 38 && marioLocation.y -50 >= 0){
				// up arrow
				marioLocation = {x : marioLocation.x, y : marioLocation.y - 50};
				redrawMario();
			}else if(code == 37 && marioLocation.x -50 >= 0){
				// left arrow
				marioLocation = {x : marioLocation.x - 50, y : marioLocation.y};
				redrawMario();
			}
			else if(code == 40 && marioLocation.y +50 <= height*50 - 50){
				// down arrow
				marioLocation = {x : marioLocation.x, y : marioLocation.y + 50};
				redrawMario();
			}
			else if(code == 39 && marioLocation.x +50 <= width*50 - 50){
				// right arrow
				marioLocation = {x : marioLocation.x + 50, y : marioLocation.y};
				redrawMario();
			}
		}
		function redrawMario(){
			ctx.strokeStyle = "yellow";
	    	ctx.beginPath();
			ctx.lineWidth = "2";
			ctx.rect(marioLocation.x , marioLocation.y, 50, 50);
			ctx.fillStyle = "yellow";
			ctx.fill();

			marioMovesCount++;
			document.getElementById('score').innerHTML = "No of moves : " + marioMovesCount;

			if(pieceLocations[marioLocation.x / 50][marioLocation.y / 50] == 1){
				piecesConquredByMario++;
				pieceLocations[marioLocation.x / 50][marioLocation.y / 50] = 0;
			}
			if(piecesConquredByMario == pieces){
				alert("Game over. Total no of moves : " + marioMovesCount);
			}

		}
		// console.log(pieceLocations);


	}

}]);