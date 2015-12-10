/*
	Update the 'notify_player()' function to implement your own AI.

	Solution to the challenge posted here: http://jsfiddle.net/pp7oby62/
  
	Defender
	Nasty Aliens are hurling red rocks at the planet Earth. Our last line of defence- The Paddle. Write the AI for The Paddle to defend the Earth from certain destruction.

	Download the instructions manual: defender-test.pdf.

	This is not specifically a "front-end" test

	This test requires only writing the logic for the movement of the paddle and not the UI.

	You must write a solution to this test using Javascript, but note that you do not need to interact with the "document object model" (DOM), and sothis test is not specifically a "front-end" test. Even if you have limited understanding of Javascript, you should be able to tackle this test.For those of you new to Javascript, I would suggest review the math and array functions available in Javascript:
	http://www.w3schools.com/jsref/jsref_obj_math.asp
	http://www.w3schools.com/js/js_arrays.asp  
*/

console.clear();

var debug=0; // if 0 there's no console output
var nRound=0; // keeps count of the number of rounds
var minDistance=0.00000000000; // the distance to the closest rock
var minRadians=0.00000000000;  // the radians for the closest rock

// calculate the distance and radians for the closest rock 
function calcualteMinDistanceAndRadian(params) {
    minDistance=parseFloat(params[0].distance);
    minRadians=parseFloat(params[0].radians);
	for(var idx=0;idx<params.length;idx++){
        if (minDistance>parseFloat(params[idx].distance)) {
            minDistance=parseFloat(params[idx].distance);
            minRadians=parseFloat(params[idx].radians);
        }
    }
}

defender.start(
  function notify_player(rocks, paddle_y){
        
	nRound = nRound + 1;
    console.log('-- Start round ' + nRound + ' ----------------------------------');      

	// for debug purpose only
	if (debug)
		for (var i=0; i < rocks.length; i++)
			console.log('rock['+i+']='+rocks[i].distance+', radians='+rocks[i].radians);

    var moves = [];
    var paddle = paddle_y;
    var new_move = 0;
      
    // find out the radians of the rock which is the closest to the paddle
	// based on the radians we calculate what is the distance we have to travel to position the paddel right under it
    calcualteMinDistanceAndRadian(rocks);

	if (debug)
		console.log('minRadians=' + minRadians + ', minDistance=' + minDistance);
		
	// based on the radians we calculate what is the distance we have to travel to position the paddel right under it; the calculation is based on Pitagora theory in a 90 degrees angled triangle		
    var deltaToMove = Math.sin(minRadians) * minDistance;
	
	// if deltaToMove is negative we just assign its module value (the positive value)
    if (deltaToMove < 0)
        deltaToMove = -1 * deltaToMove;
	if (debug)
		console.log('delta=' + deltaToMove);
    
	// add each step for the paddle based on the deltaToMove and make sure it stays in the border limits
    for (var i = 0; i < deltaToMove; i++) {
		// move towards the closest rock by inspecting its radians
        if (minRadians == 0) {
            new_move = 0;
        }
        else if (minRadians > 0.00000000000) {
            // radians negative means the rock is up so we have move the paddle up
            new_move = -1;
        }
        else {
            // radians negative means the rock is down so we move the paddle down
            new_move = 1;
        }
		if (debug)
			console.log('new_move=' + new_move);
        
		paddle = paddle + new_move;
        
		// validate new paddle position to be inside the border limits
		if (paddle >= 0 && paddle <= 9)
    		moves.push( new_move );
        else
            paddle = paddle - new_move; // paddle is out of borders, so we have to put it back
    }
	
    if (debug) {
      for (var i=0; i < moves.length; i++) {
        //console.log('rock['+i+']='+rocks[i].distance+', radians='+rocks[i].radians);
        console.log('move['+i+']='+moves[i]);
      }
      console.log('paddle_y=' + paddle_y + ', paddle=' + paddle);
		}
    console.log('-- End of round ----------------------------------');      
	
    return moves;
  }
);
