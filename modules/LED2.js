var Promise = require('bluebird');

function after( timeout ) {
  return new Promise(function( res, rej ) {
    setTimeout( res, timeout );
  });
}

function LED( led ) {
  this.led = led;
}

LED.prototype.flash = function() {
  this.on();
  after( 70 ).then(function() {
    this.off();
  }.bind(this));
};

LED.prototype.on = function() {
  this.led.on();
};

LED.prototype.off = function() {
  this.led.off();
};

LED.prototype.clear = function() {
  clearInterval( this.interval );
};

LED.prototype.bpm = function( bpm ) {
  console.log( 'setting BPM' );

  this.msPerBeat = 60 / bpm * 1000;
};

LED.prototype.beat = function() {
  var flash = function() {
    this.flash();
  }.bind(this);

  var msPerBeat = this.msPerBeat;

  var one = function() {
    clearInterval( this.interval );
    // console.log('flashing every beat');
    flash();
    this.interval = setInterval( flash, msPerBeat );
  }.bind(this);

  var two = function() {
    clearInterval( this.interval );
    // console.log('flashing ever half-beat');
    flash();
    this.interval = setInterval( flash, msPerBeat / 2 );
  }.bind(this);

  var four = function() {
    clearInterval( this.interval );
    // console.log('flashing every quarter beat');
    flash();
    this.interval = setInterval( flash, msPerBeat / 4 );
  }.bind(this);

  return {
    full: one,
    half: two,
    quarter: four
  };
};

module.exports = LED;
