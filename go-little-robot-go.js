// =======================
// Sumobot Jr demo program
// =======================

var five = require('johnny-five');
// Set up the keyboard input to quit the program
var keypress = require('keypress');
keypress(process.stdin);

var app = require( 'express' )();
var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );
var open = require( 'open' );

var Dance = require( './modules/Dance' );

app.get( '/', function( req, res ) {
  res.sendfile( 'control.html' );
});

http.listen( 3000, function() {
  console.log( 'listening on *:3000' );
});


// var board = { on: function() {}};
var board = new five.Board();

board.on( 'ready', function() {

  console.log( 'Welcome to Sumobot Jr!' )
  console.log( 'Control the bot with the arrow keys, and SPACE to stop.' )

  var left_wheel  = new five.Servo({ pin: 9, type: 'continuous', range: [75, 105] }).stop();
  var right_wheel = new five.Servo({ pin: 10, type: 'continuous'  }).stop();


  var LED = require( './modules/LED2' );
  var led = new LED( new five.Led( 13 ) );

  // // pass to led.brightness
  // five.Fn.map(speed, 0,1,0,255)

  var Wheel = require( './modules/Wheel' );

  var leftW = new Wheel( left_wheel, true );
  var rightW = new Wheel( right_wheel, false );

  var danceBot = new Dance( leftW, rightW );

  led.bpm(111.259);
  danceBot.bpm(111.259);

  function controlLED( keys ) {
    // console.log( keys );
    if ( keys.f ) {
      led.flash();
    }

    if ( keys[ '0' ] ) {
      led.clear();
    }

    if ( keys[ '4' ] ) {
      led.beat().full();
    }

    if ( keys[ '2' ] ) {
      led.beat().half();
    }

    if ( keys[ '1' ] ) {
      led.beat().quarter();
    }
  }

  function status( keys ) {
    var str = '';
    // process.stdout.write("\u001b[2J\u001b[0;0H");
    'ruld'.split('').forEach(function(key) {
      if ( keys[ key ] ) {
        str += key;
      }
    });
    return str;
  }

  function go( state ) {
    switch( state ) {
      case '':
        leftW.stop();
        rightW.stop();
        break;

      // One-key moves
      case 'r':
      case 'rud':
        danceBot.stop();
        leftW.forward('full');
        rightW.backward('half');
        break;

      case 'u':
      case 'rul':
        danceBot.stop();
        leftW.forward('full');
        rightW.forward('full');
        break;

      case 'l':
      case 'uld':
        danceBot.stop();
        leftW.backward('half');
        rightW.forward('full');
        break;

      case 'd':
      case 'rld':
        danceBot.stop();
        leftW.backward('full');
        rightW.backward('full');
        break;

      // Two-key moves
      case 'ul':
        danceBot.stop();
        // leftW.forward('half');
        leftW.stop();
        rightW.forward('full');
        break;

      case 'ru':
        danceBot.stop();
        leftW.forward('full');
        // rightW.forward('half');
        rightW.stop();
        break;

      case 'ld':
        danceBot.stop();
        // leftW.backward('half');
        leftW.stop();
        rightW.backward('full');
        break;

      case 'rd':
        danceBot.stop();
        leftW.backward('full');
        // rightW.backward('half');
        rightW.stop();
        break;

      default:
        return;
    }
  };

  io.on( 'connection', function( socket ) {
    socket.emit('ready');
    console.log( 'connected' );
    socket.on( 'keydown', function( keys ) {
      if (keys.q) {
        process.exit();
      }
      if (keys['dance!']) {
        danceBot.clear();
        danceBot.breakItDown();
      }
      if (keys['relax']) {
        danceBot.clear();
      }
      io.emit( 'keydown', keys );
      controlLED( keys );
      go( status( keys ) );
    })
    .on( 'keyup', function( keys ) {
      io.emit( 'keyup', keys );
      go( status( keys ) );
    })
    .on( 'bpm', function( bpm ) {
      led.bpm( bpm );
      danceBot.bpm( bpm );
    })
    .on('disconnect', function() {
      console.log('disconnected');
      process.exit();
    });
  });

  open( 'http://localhost:3000' );

  process.stdin.on( 'keypress', function( ch, key ) {
    if ( ! ( key && key.name ) ) {
      return;
    }

    if ( key.name === 'q' || key.name === 'escape' ) {
      console.log( 'Quitting' );
      process.exit();
      return;
    }

    if ( key.name === 'd' ) {
      console.log('breakin\' it down');
      danceBot.clear();
      danceBot.breakItDown();
      return;
    }
  });

  process.stdin.setEncoding( 'utf8' );
  process.stdin.setRawMode( true );
  process.stdin.resume();
});
