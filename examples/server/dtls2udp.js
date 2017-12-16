const index = require('../../')
    , dtls = index.createDTLSServer("cert.crt","cert.key",5685,"udp4")
    , dtls_client = require('node-dtls')
    , dgram = require('dgram')

var endpoint = "127.0.0.1"
var endpointPort = 5683

var dtls_endpoint = "127.0.0.1"
var dtls_endpointPort = 5687

udp = dgram.createSocket("udp4")
udp.bind(5686)
console.log("UDP Server listening on port: ", 5686)

var client = dtls_client.connect( dtls_endpointPort, dtls_endpoint, 'udp4')
udp.on('message', function (msg, rinfo) {
  console.log("Forwarding UDP response over DTLS from:",[rinfo.address,rinfo.port].join(":"), "to DTLS endpoint:", [dtls_endpoint,dtls_endpointPort].join(":"));
  client.send(msg);
  //console.log(msg.toString())
});



dtls.on( 'secureConnection', function( socket ) {
  console.log("Got a DTLS Connection from:",[socket.rinfo.address,socket.rinfo.port].join(":"))
  socket.on( 'message', function( message ) {
    console.log("Forwarding DTLS message from:", [socket.rinfo.address,socket.rinfo.port].join(":"), "to UDP endpoint:", [endpoint,endpointPort].join(":"));
    udp.send(message, 0, message.length, endpointPort, endpoint)
  });
});


