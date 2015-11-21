var player, ai, board, tile;

$(document).ready(function(){
	$('#board').hide();
	$('.xo-btn').on('click', function(){
		var selection = $(this).text();
		start(selection);
	});
});

function start(selection){
	// Initialise the board array with tile objects
	initTiles();

	// Player selected O, therefor AI starts
	if(selection == 'O'){
		player = 'O';
		ai = 'X';
	}
	// Player selected X, therefor starts
	else{

	}
}

function initTiles(){
	tile = [];
	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			var type = '';
			if((i==0&&j==0) || (i==0&&j==2) 
				|| (i==2&&j==0) || (i==2&&j==2))
				type = 'corner';
			else if(i==1&&j==1)
				type = 'center';
			else
				type = 'edge'

			var tile_obj = {
				coordinates : [i,j],
				type 		: type,
				value		: '',
				neighbours	: []
			};
			tile.push(tile_obj);
		}
	}
	console.log(tile_obj);
}