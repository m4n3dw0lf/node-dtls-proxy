function help(){
  console.log('\nnode-dtls-proxy\n\nusage:\n  $ node udp2dtls.js <UDP_LISTEN_PORT> <DTLS_ENDPOINT> <DTLS_ENDPOINT_PORT> \n\nexample:\n  $ node udp2dtls.js 5687 localhost 5684\n')
}

require('dotenv').config()
var dtls_endpoint = process.env.DTLS_ENDPOINT
var dtls_endpointPort = process.env.DTLS_ENDPOINT_PORT
var udp_listen_port = process.env.UDP_LISTEN_PORT

if ( typeof(udp_listen_port) != "undefined" || typeof(dtls_endpoint) != "undefined" || typeof(dtls_endpointPort) != "undefined" )
{}
else {
  udp_listen_port = process.argv[2]
  dtls_endpoint = process.argv[3]
  dtls_endpointPort = process.argv[4]
}

if ( typeof(udp_listen_port) == "undefined" || typeof(dtls_endpoint) == "undefined" || typeof(dtls_endpointPort) == "undefined" ){
    console.log(process.argv[3])
    help()
    process.exit()
}

console.log("[+] Starting UDP2DTLS Proxy");

const index = require('../')
  , udp = index.createUDPServer(udp_listen_port,"udp4")
  , dtls = require('node-dtls')


var client = dtls.connect( dtls_endpointPort, dtls_endpoint, 'udp4')

udp.on('message', function (message, rinfo) {
  udp_endpoint = rinfo.address
  udp_endpointPort = rinfo.port
  console.log("Encrypting UDP message from:", [rinfo.address,rinfo.port].join(":"), "and forwarding to DTLS2UDP endpoint");
  client.send(message)
});


client.on( 'message', function( message ){
    console.log("Decrypting DTLS message and forwarding to UDP client:", [udp_endpoint,udp_endpointPort].join(":"));
    udp.send(message, 0, message.length, udp_endpointPort, udp_endpoint);
});
