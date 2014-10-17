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

      case 'f':
        led.flash();
        return;

      case 'u':
        led.clear();
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

      default:
        return;

    }


  }); // process.stdin.on

  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  process.stdin.resume();


});
