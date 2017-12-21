function help(){
  console.log('\nnode-dtls-proxy\n\nusage:\n  $ node dtls2udp.js <DTLS_LISTEN_PORT> <UDP_LISTEN_PORT>  <UDP_ENDPOINT> <UDP_ENDPOINT_PORT> \n\nexample:\n  $ node bin/dtls2udp.js 5684 5685 localhost 5683\n')
}

require('dotenv').config()
var endpoint = process.env.UDP_ENDPOINT
var endpointPort = process.env.UDP_ENDPOINT_PORT
var dtls_listen_port = process.env.DTLS_LISTEN_PORT
var udp_listen_port = process.env.UDP_LISTEN_PORT

if (typeof(udp_listen_port) != "undefined" || typeof(dtls_listen_port) != "undefined" || typeof(endpoint) != "undefined" || typeof(endpointPort) != "undefined")
{}
else {
  dtls_listen_port = process.argv[2]
  udp_listen_port = process.argv[3]
  endpoint = process.argv[4]
  endpointPort = process.argv[5]
}

if (typeof(udp_listen_port) == "undefined" || typeof(dtls_listen_port) == "undefined" || typeof(endpoint) == "undefined" || typeof(endpointPort) == "undefined"){
    help()
    process.exit()
}

console.log("[+] Starting DTLS2UDP Proxy")

const index = require('../')
    , dtls = index.createDTLSServer("cert.crt","cert.key",dtls_listen_port,"udp4")
    , dgram = require('dgram')

var dtls_socket;

udp = dgram.createSocket("udp4")
udp.bind(udp_listen_port)
console.log("UDP Server listening on port: ", udp_listen_port)


udp.on('message', function (msg, rinfo) {
  console.log("Encrypting UDP response from:",[rinfo.address,rinfo.port].join(":"), "and forwarding to  UDP2DTLS endpoint");
  dtls_socket.send(msg);
});


dtls.on( 'secureConnection', function( socket ) {
  console.log("Got a DTLS Connection from:",[socket.rinfo.address,socket.rinfo.port].join(":"))
  socket.on( 'message', function( message ) {
    dtls_socket = socket
    console.log("Decrypting DTLS message from:", [socket.rinfo.address,socket.rinfo.port].join(":"), "and forwarding to UDP endpoint");
    udp.send(message, 0, message.length, endpointPort, endpoint)
  });
});


