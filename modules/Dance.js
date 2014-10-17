var Promise = require('bluebird');


function after( timeout ) {
  return new Promise(function( res, rej ) {
    setTimeout( res, timeout );
  });
}

function Dance( leftW, rightW ) {
  this.leftW = leftW;
  this.rightW = rightW;
}

Dance.prototype.bpm = function( bpm ) {
  this.msPerBeat = 60 / bpm * 1000;
};

Dance.prototype.clear = function() {
  clearTimeout( this.danceTimeout );
  this._dancing = false;
  this.stop();
};

// Basic moves

Dance.prototype.goLeft = function() {
  this.leftW.backward('full');
  this.rightW.forward('full');
};

Dance.prototype.goRight = function() {
  this.leftW.forward('full');
  this.rightW.backward('full');
};

Dance.prototype.goForward = function() {
  this.leftW.forward('full');
  this.rightW.forward('full');
};

Dance.prototype.goBack = function() {
  this.leftW.backward('full');
  this.rightW.backward('full');
};

Dance.prototype.stop = function() {
  this.leftW.stop();
  this.rightW.stop();
};

// Helpers

Dance.prototype.for = function( time, move ) {
  this[ move ]();
  return after( time ).then(function() {
    this.stop();
  }.bind(this));
};

Dance.prototype.in = function( beats ) {
  var beatPromise = after( this.msPerBeat * beats );

  var resolve = function(fn) {
    if (!this._dancing) {
      return;
    }
    beatPromise.then(fn);
  }.bind(this);

  return {
    beat: resolve,
    beats: resolve
  };
};

Dance.prototype.times = function( n, fn ) {
  for (var i = 0; i < n; i++) {
    this.in( i ).beats( fn.bind(this) );
  }
};

// One-beat moves

Dance.prototype.toTheLeft = function() {
  this.for( 125, 'goLeft' );
};

Dance.prototype.toTheRight = function() {
  this.for( 125, 'goRight' );
};

Dance.prototype.leftChaCha = function() {
  this.for( 125, 'goLeft' )
    .then(function() {
      return this.for( 125, 'goRight' );
    }.bind(this))
    .then(function() {
      return this.for( 125, 'goLeft' );
    }.bind(this));
};

Dance.prototype.rightChaCha = function() {
  this.for( 125, 'goRight' )
    .then(function() {
      return this.for( 125, 'goLeft' );
    }.bind(this))
    .then(function() {
      return this.for( 125, 'goRight' );
    }.bind(this));
};

// Four-Beat Moves

Dance.prototype.chaChaRight = function() {
  this.rightChaCha();

  this.in(1).beat(function() {
    this.leftChaCha();
  }.bind(this));

  this.in(2).beats(function() {
    this.rightChaCha();
  }.bind(this));

  this.in(3).beats(function() {
    this.leftChaCha();
  }.bind(this));
};

Dance.prototype.chaChaLeft = function() {
  this.leftChaCha();

  this.in(1).beat(function() {
    this.rightChaCha();
  }.bind(this));

  this.in(2).beats(function() {
    this.leftChaCha();
  }.bind(this));

  this.in(3).beats(function() {
    this.rightChaCha();
  }.bind(this));
};

Dance.prototype.shuffleLeft = function() {
  this.toTheLeft();

  this.in(1).beat(function() {
    this.toTheLeft();
  }.bind(this));

  this.in(2).beats(function() {
    this.toTheLeft();
  }.bind(this));

  this.in(3).beats(function() {
    this.toTheLeft();
  }.bind(this));
};

Dance.prototype.shuffleRight = function() {
  this.toTheRight( );

  this.in(1).beat(function() {
    this.toTheRight();
  }.bind(this));

  this.in(2).beats(function() {
    this.toTheRight();
  }.bind(this));

  this.in(3).beats(function() {
    this.toTheRight();
  }.bind(this));
};

Dance.prototype.backItUp = function() {
  this.times( 4, function() {
    console.log('back it up');
    this.for( 125, 'goBack' );
  }.bind(this) );
};

Dance.prototype.stepStepStep = function() {
  this.times( 4, function() {
    console.log('step step');
    this.for( 125, 'goForward' );
  }.bind(this) );
};

// Put it all together, and do it once a measure

Dance.prototype.breakItDown = function() {
  clearTimeout( this.danceTimeout );
  this._dancing = true;

  var moves = [
    'shuffleLeft',
    'shuffleRight',
    'chaChaLeft',
    'chaChaRight',
    'backItUp',
    'stepStepStep'
  ];

  var randomMove = moves[ Math.floor( Math.random() * moves.length ) ];

  this[ randomMove ]();

  this.danceTimeout = setTimeout(function() {
    console.log()
    this.breakItDown();
  }.bind(this), this.msPerBeat * 4);
};

module.exports = Dance;
