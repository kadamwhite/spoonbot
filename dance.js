// =======================
// Sumobot Jr demo program
// =======================

var five = require('johnny-five');
var keypress = require('keypress');

keypress(process.stdin);

// var board = { on: function() {}};
var board = new five.Board();

board.on('ready', function() {

  console.log('Welcome to Sumobot Jr!')
  console.log('Control the bot with the arrow keys, and SPACE to stop.')

  var left_wheel  = new five.Servo({ pin: 9, type: 'continuous', range: [75, 105] }).stop();
  var right_wheel = new five.Servo({ pin: 10, type: 'continuous'  }).stop();

  // // pass to led.brightness
  // five.Fn.map(speed, 0,1,0,255)

  // function Wheel() {
  //   var speed =
  // }

  var fullSpeed = 0.5;

  function Wheel( wheel, cwIsForward ) {
    this._speed = 0;
    this.wheel = wheel;

    console.log( this.wheel );
    this.wheel.cw(0.05);

    if ( cwIsForward ) {
      this.forward = this.wheel.cw.bind(this.wheel);
      this.backward = this.wheel.ccw.bind(this.wheel);
    } else {
      this.forward = this.wheel.ccw.bind(this.wheel);
      this.backward = this.wheel.cw.bind(this.wheel);
    }
  };

  Wheel.prototype.go = function( speed ) {
    if ( speed === 0 ) {
      this.wheel.stop();
    } else if ( speed > 0 ) {
      this.forward( this._speed );
    } else {
      this.backward( Math.abs( this._speed ) );
    }
  };

  Wheel.prototype.speedUp = function() {
    this._speed += 0.05;
    this._speed = parseFloat( this._speed.toFixed( 2 ) );
    console.log(this._speed);
    if ( this._speed > 0.5 ) { this._speed = 0.5 };
    this.go( this._speed );
  };

  Wheel.prototype.speedDown = function() {
    this._speed -= 0.05;
    this._speed = parseFloat( this._speed.toFixed( 2 ) );
    console.log(this._speed);
    if ( this._speed < -0.5 ) { this._speed = -0.5 };
    this.go( this._speed );
  };

  var leftW = new Wheel( left_wheel, true );
  var rightW = new Wheel( right_wheel, false );

  // function Dance() {};

  // Dance.prototype.forward = function forward() {
  //   console.log('Forward');
  //   left_wheel.cw();
  //   right_wheel.ccw(speed);
  //   return this;
  // };
  // Dance.prototype.back = function backward() {
  //   console.log('Backward');
  //   left_wheel.ccw(speed);
  //   right_wheel.cw();
  //   return this;
  // };
  // Dance.prototype.left = function left() {
  //   console.log('Left');
  //   left_wheel.ccw(speed);
  //   right_wheel.cw();
  //   return this;
  // };
  // Dance.prototype.right = function right() {
  //   console.log('Right');
  //   left_wheel.cw();
  //   right_wheel.ccw(speed);
  //   return this;
  // };
  // Dance.prototype.stop = function stop() {
  //   left_wheel.stop();
  //   right_wheel.stop();
  //   return this;
  // }

  // var go = new Dance(speed);


  process.stdin.on('keypress', function(ch, key) {

    if ( ! ( key && key.name ) ) {
      return;
    }

    switch (key.name) {

      case 'escape':
        console.log('Quitting');
        // go.stop();
        process.exit();
        return;

      case 'q':
        console.log('Quitting');
        // go.stop();
        process.exit();
        return;

      case 'e':
        console.log('Quitting');
        // go.stop();
        process.exit();
        return;

      case 'up':
      case 'w':

        leftW.speedUp();

        console.log('Forward');
        // left_wheel.ccw(speed);
        // right_wheel.cw();
        return;

      case 'down':
      case 's':
        leftW.speedDown();

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

      default:
        return;

    }


  }); // process.stdin.on

  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  process.stdin.resume();


});
