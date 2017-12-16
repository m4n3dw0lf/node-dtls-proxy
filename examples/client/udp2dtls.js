require('dotenv').config()
var endpoint = process.env.DTLS_REMOTE
if (typeof(endpoint) != "undefined"){}
else {
  endpoint = process.argv[2]
  if (typeof(endpoint) == "undefined"){
    console.log("You need to specify the DTLS Server endpoint\nusage:\n  node udp2dtls.js <DTLS_SERVER>")
    process.exit()
  }
}
endpointPort = 5685

c = 0

udp_endpoint = "localhost"
udp_endpointPort = 5688

const index = require('../../')
  , udp = index.createUDPServer(5684,"udp4")
  , dtls = require('node-dtls')
  , dtls_server = index.createDTLSServer("cert.crt","cert.key",5687,"udp4")

dtls_server.on( 'secureConnection', function( socket ){
  console.log("Got a DTLS message from:", [socket.rinfo.address, socket.rinfo.port].join(":"), "to UDP client:", [endpoint, endpointPort].join(":"));
  socket.on('message', function(message){
    console.log("Forwarding DTLS message from:", [socket.rinfo.address,socket.rinfo.port].join(":"), "to UDP client:", [udp_endpoint,udp_endpointPort].join(":"));
    udp.send(message, 0, message.length, udp_endpointPort, udp_endpoint);
  });
});



var client = dtls.connect( endpointPort, endpoint, 'udp4')
udp.on('message', function (message, rinfo) {
  udp_endpoint = rinfo.address
  udp_endpointPort = rinfo.port
  console.log("Forwarding UDP message from:", [rinfo.address,rinfo.port].join(":"), "to DTLS server:", [endpoint, endpointPort].join(":"));
  client.send(message)
});

