var app = require( 'express' )();
var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );

app.get( '/', function( req, res ) {
  res.sendfile( 'control.html' );
});

io.on( 'connection', function( socket ) {
  console.log( 'a user connected' );
  socket.on( 'keydown', function( msg ) {
    console.log( 'keydown', msg );
    io.emit( 'keydown', msg );
  }).on( 'keyup', function( msg ) {
    console.log( 'keyup', msg );
    io.emit( 'keyup', msg );
  });
});

http.listen( 3000, function() {
  console.log( 'listening on *:3000' );
});
