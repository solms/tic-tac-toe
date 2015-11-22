var player, ai, board, tiles, turn;

$(document).ready(function(){
	$('#board').hide();
	$('.xo-btn').on('click', function(){
		var selection = $(this).text();
		start(selection);
	});

	$('.tile').on('click', function(){
		if($(this).text() == ''){
			var index = $(this).attr('id').replace(/[^0-9.]/g,'');
			userClick(Number(index));
		}
	});
});

function start(selection){
	turn = 'player';

	// Initialise the board array with tile objects
	initTiles();

	// Hide welcome message, show the board
	$('#welcome').hide();
	$('#board').show();

	// Player selected O, therefor AI starts
	if(selection == 'O'){
		// Deactivate buttons
		changeTurns();
		player = 'O';
		ai = 'X';
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
	}
}

// Activate the buttons for player move
function changeTurns(){
	if(turn == 'ai'){
		turn = 'player';
		checkForWinner(turn);
		$('.tile').prop('disabled', false);
	}
	else{
		turn = 'ai';
		checkForWinner(turn);
		$('.tile').prop('disabled', true);

	}
}

// Updates the HTML display of the board
function updateBoard(){
	for(var i=0; i<tiles.length; i++){
		$('#tile-'+i).text(tiles[i].value);
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
		|| diagonal[0].indexOf(3) != -1)
		alert("AI wins!");
	if(horizontal[1].indexOf(3) != -1
		|| vertical[1].indexOf(3) != -1
		|| diagonal[1].indexOf(3) != -1)
		alert("Player wins!");
	
	// If it's the AI's turn
	if(turn == 'ai'){
		// Try to win
		if(horizontal[0].indexOf(2) != -1){
			// Check which horizontal row could be a winner
			if(horizontal[0][0].indexOf(2)){
				for(var i=0; i<3; i++){
					if(tiles[i].value != ai && tiles[i].value != player){
						tiles[i].value = ai;
						updateBoard();
						changeTurns();
						return;
					}

				}
			}
			if(horizontal[0][1].indexOf(2)){
				for(var i=3; i<6; i++){
					if(tiles[i].value != ai && tiles[i].value != player){
						tiles[i].value = ai;
						updateBoard();
						changeTurns();
						return;
					}

				}
			}
			if(horizontal[0][2].indexOf(2)){
				for(var i=6; i<9; i++){
					if(tiles[i].value != ai && tiles[i].value != player){
						tiles[i].value = ai;
						updateBoard();
						changeTurns();
						return;
					}

				}
			}
		}
		if(vertical[0].indexOf(2) != -1){
			if(vertical[0][0].indexOf(2)){
				for(var i=0; i<=6; i=i+3){
					if(tiles[i].value != ai && tiles[i].value != player){
						tiles[i].value = ai;
						updateBoard();
						changeTurns();
						return;
					}

				}
			}
			if(vertical[0][1].indexOf(2)){
				for(var i=1; i<=7; i=i+3){
					if(tiles[i].value != ai && tiles[i].value != player){
						tiles[i].value = ai;
						updateBoard();
						changeTurns();
						return;
					}

				}
			}
			if(vertical[0][2].indexOf(2)){
				for(var i=2; i<=8; i=i+3){
					if(tiles[i].value != ai && tiles[i].value != player){
						tiles[i].value = ai;
						updateBoard();
						changeTurns();
						return;
					}

				}
			}
		}
		if(diagonal[0].indexOf(2) != -1){
			if(diagonal[0][0].indexOf(2)){
				for(var i=0; i<=8; i=i+4){
					if(tiles[i].value != ai && tiles[i].value != player){
						tiles[i].value = ai;
						updateBoard();
						changeTurns();
						return;
					}

				}
			}
			if(diagonal[0][1].indexOf(2)){
				for(var i=2; i<=6; i=i+2){
					if(tiles[i].value != ai && tiles[i].value != player){
						tiles[i].value = ai;
						updateBoard();
						changeTurns();
						return;
					}

				}
			}
		}
		// Try to block
		// Do something random
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