var board_arr = [];
var ai_marker;
var human_marker;

$(document).ready(function(){
	$('#board').hide();
	$('.tile').prop('disabled', true);
	$('.xo-btn').on('click', function(){
		var choice = $(this).text();
		$('#welcome').hide('slow');
		$('#board').show('slow');
		start(choice);
	});
});

// Start the game
function start(c){
	// Initialise the board
	for(var i=0; i<3; i++)
		board_arr[i] = ['','',''];

	// AI plays first
	if(c == 'X'){
		ai_marker = 'X';
		human_marker = 'O';
		// Random choose either the center or one of the corners
		// Explanation: 0: center; 1-4: corners, clockwise from top-left
		var start_pos = Math.floor(Math.random()*5);
		console.log(start_pos);
		switch(start_pos){
			case 0:
				board_arr[1][1] = 'X';
				break;
			case 1:
				board_arr[0][0] = 'X';
				break;
			case 2:
				board_arr[0][2] = 'X';
				break;
			case 3:
				board_arr[2][0] = 'X';
				break;
			case 4:
				board_arr[2][2] = 'X';
				break;
		}
		updateDisplay();
	}
	else{
		ai_marker = 'O';
		human_marker = 'X';
	}
	playerRound();
}

function playerRound(){
	$('.tile').prop('disabled', false);
	$('.tile').on('click', function(){
		if($(this).text() == ''){
			var pos = $(this).attr('id').replace(/tile-/,"");
			console.log(pos);
		}
	})
}

function updateDisplay(){
	for(var i=0; i<3; i++)
		for(var j=0; j<3; j++)
			$('#tile-'+i+''+j).text(board_arr[i][j]);
}