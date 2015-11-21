var player, ai;

$(document).ready(function(){
	$('#board').hide();
	$('.xo-btn').on('click', function(){
		var selection = $(this).text();
		start(selection);
	});
});

function start(selection){
	// Player selected O, therefor AI starts
	if(selection == 'O'){
		player = 'O';
		ai = 'X';
	}
	// Player selected X, therefor starts
	else{
		
	}
}