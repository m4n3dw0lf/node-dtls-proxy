var dtls = require( 'node-dtls' );
var fs = require( 'fs' );

function dtlsServer(crt,key,port,type){
  var key = fs.readFileSync(key);
  var crt = fs.readFileSync(crt);
  var server = dtls.createServer({ type: type, key: key, cert: crt });
  server.bind( port );
  console.log('DTLS Server listening on port:',port);
  return server
}


module.exports = dtlsServer
