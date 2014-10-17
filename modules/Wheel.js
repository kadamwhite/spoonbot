var speeds = {
  full: 1,
  half: 0.025
};

function Wheel( wheel, cwIsForward ) {
  this.wheel = wheel;
  // console.log('initializing a wheel with clockwise set to' + cwIsForward);
  this.cwIsForward = cwIsForward;
};

Wheel.prototype.forward = function( speed ) {
  if ( this.cwIsForward ) {
    console.log('cw');
    this.wheel.cw( speeds[ speed ] );
  } else {
    this.wheel.ccw( speeds[ speed ] );
  }
};

Wheel.prototype.backward = function( speed ) {
  if ( this.cwIsForward ) {
    this.wheel.ccw( speeds[ speed ] );
  } else {
    this.wheel.cw( speeds[ speed ] );
  }
};

Wheel.prototype.stop = function() {
  this.wheel.stop();
};

module.exports = Wheel;
