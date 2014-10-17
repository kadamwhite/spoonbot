// =======================
// Sumobot Jr demo program
// =======================

var five = require('johnny-five');
var keypress = require('keypress');

keypress(process.stdin);

// var board = { on: function() {}};
var board = new five.Board();



// MY STUFF

var LED = require( './modules/LED' );

// END MY STUFF

board.on('ready', function() {

  console.log('Welcome to Sumobot Jr!')
  console.log('Control the bot with the arrow keys, and SPACE to stop.')

  var led = new LED( new five.Led(13) );

  process.stdin.on('keypress', function(ch, key) {
    console.log(key && key.name, key);

    if ( ! ( key && key.name ) ) {
      return;
    }

    switch (key.name) {

      case 'escape':
      case 'q':
        console.log('Quitting');
        // go.stop();
        process.exit();
        return;

      case 'up':
      case 'w':

        // leftW.speedUp();
        led.on();


        console.log('Forward');
        // left_wheel.ccw(speed);
        // right_wheel.cw();
        return;

      case 'down':
      case 's':
        // leftW.speedDown();
        led.off();

        console.log('Backward');
        // left_wheel.cw();
        // right_wheel.ccw(speed);
        return;

      case 'left':
      case 'a':
        console.log('Left');
        left_wheel.ccw(speed);
        right_wheel.ccw(speed);
        return;


      case 'right':
      case 'd':
        console.log('Right');
        left_wheel.cw();
        right_wheel.cw();
        return;

      case 'space':
        console.log('Stopping');
        left_wheel.stop();
        right_wheel.stop();
        return;

      case 'f':
        led.flash();
        return;

      case 'i':
        led.bpm( 111.259 ).one();
        return;

      case 'o':
        led.bpm( 111.259 ).two();
        return;

      case 'p':
        led.bpm( 111.259 ).four();
        return;

      case 'u':
        led.clear();
        return;

      default:
        return;

    }


  }); // process.stdin.on

  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  process.stdin.resume();


});
