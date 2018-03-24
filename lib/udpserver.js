var dgram = require('dgram');

function udpServer(port, type){
  var server = dgram.createSocket(type);
  server.bind(port,"0.0.0.0")
  return server;
}

module.exports = udpServer
