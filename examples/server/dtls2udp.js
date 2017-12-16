const index = require('../../')
    , dtls = index.createDTLSServer("cert.crt","cert.key",5685,"udp4")
    , dgram = require('dgram')

var endpoint = "127.0.0.1"
var endpointPort = 5683

udp = dgram.createSocket("udp4")
dtls.on( 'secureConnection', function( socket ) {
  console.log("Got a DTLS Connection from:",[socket.rinfo.address,socket.rinfo.port].join(":"))
  socket.on( 'message', function( message ) {
    console.log("Forwarding DTLS message from:", socket.rinfo.address, "to UDP endpoint:", endpoint);
    udp.send(message, 0, message.length, endpointPort, endpoint)
  });
});


