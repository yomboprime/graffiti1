
// CONFIG PARAMS

var listenPort = 8091;

//


var fs = require( 'fs' );
var express = require( 'express' );
var pathJoin = require( 'path' ).join;
var http = require( 'http' );

var app = null;
var httpServer = null;

process.on( "SIGINT", function() {

	console.log( "SIGINT Signal Received, shutting down" );
	process.exit( 0 );

} );

// Create server
app = express();
httpServer = http.Server( app );

// Serve all public content
app.use( "/", express.static( __dirname ) );

// Start listening
httpServer.listen( listenPort );

console.log( "Serving on port: " + listenPort + "..." );

console.log( "" );

console.log( "You can open the game at: http://127.0.0.1:" + listenPort + "/index.html" );


