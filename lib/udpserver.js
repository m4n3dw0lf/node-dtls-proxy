var dgram = require('dgram');

function udpServer(port, type){
  var server = dgram.createSocket(type);
  server.bind(port,"0.0.0.0")
  console.log('UDP Server listening on port:',port);
  return server;
}

module.exports = udpServer
