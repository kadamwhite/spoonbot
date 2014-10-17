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

  var msPerBeat = 60 / bpm * 1000;

  var flash = function() {
    this.flash();
  }.bind(this);

  var one = function() {
    clearInterval( this.interval );
    console.log('flashing every beat');
    flash();
    this.interval = setInterval( flash, Math.floor( msPerBeat ) );
  }.bind(this);

  var two = function() {
    clearInterval( this.interval );
    console.log('flashing ever half-beat');
    flash();
    this.interval = setInterval( flash, Math.floor( msPerBeat / 2 ) );
  }.bind(this);

  var four = function() {
    clearInterval( this.interval );
    console.log('flashing every quarter beat');
    flash();
    this.interval = setInterval( flash, Math.floor( msPerBeat / 4 ) );
  }.bind(this);

  return {
    one: one,
    two: two,
    four: four
  };
};

module.exports = LED;
