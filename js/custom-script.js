var player, ai, board, tiles, turn;
var total_moves = 0;
var cont = false;

$(document).ready(function(){
	$('#board').hide();
	$('#finished').hide();
	$('#continue').hide();
	$('#play-again').hide();
	$('.xo-btn').on('click', function(){
		var selection = $(this).text();
		start(selection);
	});

	$('.tile').on('click', function(){
		if($(this).text() != 'X' && $(this).text() != 'O'){
			var index = $(this).attr('id').replace(/[^0-9.]/g,'');
			userClick(Number(index));
		}
	});
});

function start(selection){
	// Initialise the board array with tile objects
	initTiles();

	// Hide welcome message, show the board
	$('#welcome').hide();
	$('#board').show();

	// Player selected O, therefor AI starts
	if(selection == 'O'){
		player = 'O';
		ai = 'X';
		turn = 'ai';
		// AI plays corner or center tile at random
		var start_index = Math.floor(Math.random()*5)*2;
		tiles[start_index].value = ai;
		updateBoard();
		// Wait for player move
		changeTurns();
	}
	// Player selected X, therefor starts
	else{
		updateBoard();
		player = 'X';
		ai = 'O';
		turn = 'player';
	}
}

// Activate the buttons for player move
function changeTurns(){
	total_moves++;
	if(turn == 'ai'){
		turn = 'player';
		checkForWinner(turn);
	}
	else{
		turn = 'ai';
		checkForWinner(turn);
	}
}

// Updates the HTML display of the board
function updateBoard(){
	for(var i=0; i<tiles.length; i++){
		if(tiles[i].value != ''){
			$('#tile-'+i).html('<img class="labe" src="resources/'+tiles[i].value+'.jpg"></img>');
			//$('#tile-'+i).text(tiles[i].value);
		}
		//console.log('<img class="label" src="../resources/'+tiles[i].value+'.jpg"></img>');
	}
}

// React to a user placing a tile
function userClick(index){
	tiles[index].value = player;
	updateBoard();
	changeTurns();
}

// Checks if anyone won the game
function checkForWinner(turn){
	// Store ai in first array, player in second
	/*
		EXAMPLE
		[X-X
		 OX-
		 XOO]

		 horizontal = [[2,1,1],[0,1,2]]
		 vertical = [[2,1,1],[1,1,1]]
		 diagonal = [[2,3],[1,0]]

		 Winner, because diagonal[0][1] == 3

	*/
	if(total_moves == 9)
		finish('draw');

	var horizontal 	= [[0,0,0],[0,0,0]];
	var vertical 	= [[0,0,0],[0,0,0]];
	var diagonal 	= [[0,0],[0,0]];
	var index;
	for(var i=0; i<9; i++){
		// Horizontal
		if(i<3)
			index = 0;
		else if(i<6)
			index = 1;
		else
			index = 2;
		if(tiles[i].value == ai)
			horizontal[0][index]++;
		else if(tiles[i].value == player)
			horizontal[1][index]++;

		// Vertical
		if(i==0 || i==3 || i==6)
			index = 0;
		else if(i==1 || i==4 || i==7)
			index = 1;
		else
			index = 2;
		if(tiles[i].value == ai)
			vertical[0][index]++;
		else if(tiles[i].value == player)
			vertical[1][index]++;

		// Diagonal
		if(i==0 || i==8){
			if(tiles[i].value == ai)
				diagonal[0][0]++;
			else if(tiles[i].value == player)
				diagonal[1][0]++;	
		}
		else if(i==2 || i==6){
			if(tiles[i].value == ai)
				diagonal[0][1]++;
			else if(tiles[i].value == player)
				diagonal[1][1]++;
		} else if(i==4){
			if(tiles[i].value == ai){
				diagonal[0][0]++;
				diagonal[0][1]++;
			}
			else if(tiles[i].value == player){
				diagonal[1][0]++;
				diagonal[1][1]++;
			}
		}
	}

	if(horizontal[0].indexOf(3) != -1
		|| vertical[0].indexOf(3) != -1
		|| diagonal[0].indexOf(3) != -1){
		finish('ai');
		return;
	}
		
	if(horizontal[1].indexOf(3) != -1
		|| vertical[1].indexOf(3) != -1
		|| diagonal[1].indexOf(3) != -1){
		finish('player');
		return;
	}
	
	// If it's the AI's turn
	if(turn == 'ai'){
		// Try to win
		if(completeThree(horizontal,vertical,diagonal,'attack'))
			return;
		// Try to block
		if(completeThree(horizontal,vertical,diagonal,'block'))
			return;
		// Do something random
		var placed = false;
		while(!placed && total_moves<9){
			var pos = Math.floor(Math.random()*9);
			if(tiles[pos].value == ''){
				tiles[pos].value = ai;
				placed = true;
				updateBoard();
				changeTurns();
				return;
			}
		}
	}	
}

// End the game
function finish(condition){
	$('#continue').show();
	$('#continue').on('click', function(){
		cont = true;
		finish(condition);
	});

	if(cont){
		$('#continue').hide();
		var text;
		if(condition == 'player'){
			text = 'You are the winner!';
		} else if(condition == 'ai'){
			text = 'Better luck next time!';
		} else if(condition == 'draw'){
			text = 'Stalemate ...';
		} else{
			console.log("Error: Unexpected condition passed.");
		}
		$('#board').hide();
		$('#finished').html('<h1>'+text+'</h1>');
		$('#finished').show();
		$('#play-again').show();
		$('#play-again').on('click', function(){
			document.location.reload(true);
		});
	}
}

// Try to either win by completing three in your favour
// Or block by adding label to the end of opponent three
function completeThree(horizontal,vertical,diagonal,move){
	var x;
	if(move == 'attack')
		x = 0;
	else if(move == 'block')
		x = 1;
	else
		console.log("Error: Did not send 'attack' or 'block' to completeThree function.");

	if(horizontal[x].indexOf(2) != -1){
		// Check which horizontal row could be a winner
		if(horizontal[x][0] == 2){
			for(var i=0; i<3; i++){
				if(tiles[i].value != ai && tiles[i].value != player){
					tiles[i].value = ai;
					updateBoard();
					changeTurns();
					return true;
				}

			}
		}
		if(horizontal[x][1] == 2){
			for(var i=3; i<6; i++){
				if(tiles[i].value != ai && tiles[i].value != player){
					tiles[i].value = ai;
					updateBoard();
					changeTurns();
					return true;
				}

			}
		}
		if(horizontal[x][2] == 2){
			for(var i=6; i<9; i++){
				if(tiles[i].value != ai && tiles[i].value != player){
					tiles[i].value = ai;
					updateBoard();
					changeTurns();
					return true;
				}

			}
		}
	}
	if(vertical[x].indexOf(2) != -1){
		if(vertical[x][0] == 2){
			for(var i=0; i<=6; i=i+3){
				if(tiles[i].value != ai && tiles[i].value != player){
					tiles[i].value = ai;
					updateBoard();
					changeTurns();
					return true;
				}

			}
		}
		if(vertical[x][1] == 2){
			for(var i=1; i<=7; i=i+3){
				if(tiles[i].value != ai && tiles[i].value != player){
					tiles[i].value = ai;
					updateBoard();
					changeTurns();
					return true;
				}

			}
		}
		if(vertical[x][2] == 2){
			for(var i=2; i<=8; i=i+3){
				if(tiles[i].value != ai && tiles[i].value != player){
					tiles[i].value = ai;
					updateBoard();
					changeTurns();
					return true;
				}

			}
		}
	}
	if(diagonal[x].indexOf(2) != -1){
		if(diagonal[x][0] == 2){
			for(var i=0; i<=8; i=i+4){
				if(tiles[i].value != ai && tiles[i].value != player){
					tiles[i].value = ai;
					updateBoard();
					changeTurns();
					return true;
				}

			}
		}
		if(diagonal[x][1] == 2){
			for(var i=2; i<=6; i=i+2){
				if(tiles[i].value != ai && tiles[i].value != player){
					tiles[i].value = ai;
					updateBoard();
					changeTurns();
					return true;
				}

			}
		}
	}
}

/* Initialise the tile objects
   [0 1 2
	3 4 5
	6 7 8]
*/
function initTiles(){
	tiles = [];
	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			var type = '';
			var neighbours = [];

			if(i==0&&j==0){
				type = 'corner';
				neighbours = [1,3];
			} else if(i==0&&j==1){
				type = 'edge';
				neighbours = [0,2,4];
			} else if(i==0&&j==2){
				type = 'corner';
				neighbours = [1,5];
			} else if(i==1&&j==0){
				type = 'edge';
				neighbours = [0,4,6];
			} else if(i==1&&j==1){
				type = 'center';
				neighbours = [1,3,5,7];
			} else if(i==1&&j==2){
				type = 'edge';
				neighbours = [2,4,8];
			} else if(i==2&&j==0){
				type = 'corner';
				neighbours = [3,7];
			} else if(i==2&&j==1){
				type = 'edge';
				neighbours = [4,6,8];
			} else if(i==2&&j==2){
				type = 'corner';
				neighbours = [5,7];
			}

			var tile_obj = {
				coordinates : [i,j],
				type 		: type,
				value		: '',
				neighbours	: neighbours
			};
			tiles.push(tile_obj);
		}
	}
}