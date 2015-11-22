var player, ai, board, tiles, game_state;

$(document).ready(function(){
	$('#board').hide();
	$('.xo-btn').on('click', function(){
		var selection = $(this).text();
		start(selection);
	});

	$('.tile').on('click', function(){
		if($(this).text() == ''){
			var location_str = $(this).attr('id').replace(/[^0-9.]/g,'');
			var location = [Number(location_str.substring(0,1)),
							Number(location_str.substring(1))];
			userClick(location);
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
	// Deactivate buttons
	changeTurns();
	if(selection == 'O'){
		game_state = ['ai'];
		player = 'O';
		ai = 'X';
		// AI plays the center tile
		tiles[4].value = ai;
		updateBoard();
		// Wait for player move
		changeTurns();
	}
	// Player selected X, therefor starts
	else{
		game_state = ['player'];
	}
}

// Activate the buttons for player move
function changeTurns(){
	console.log($('.tile').prop('disabled'));
	if($('.tile').prop('disabled') == true)
		$('.tile').prop('disabled', false);
	else
		$('.tile').prop('disabled', true);
}

// Updates the HTML display of the board
function updateBoard(){
	for(var i=0; i<tiles.length; i++){
		var tile_id = '#tile-'+tiles[i].coordinates[0]+tiles[i].coordinates[1];
		$(tile_id).text(tiles[i].value);
	}
}

// React to a user placing a tile
function userClick(pos){
	// AI started (in center)
	if(game_state[0] == 'ai'){
		if(game_state.length == 1){
			// Find the tile clicked object
			var index;
			for(var i=0; i<tiles.length; i++){
				if(tiles[i].coordinates.equals(pos))
					index = i;
			}

		} else {

		}
	} else{

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
	console.log(tiles);
}

// CREDIT: Tomas Zato, on StackOverflow
// http://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});