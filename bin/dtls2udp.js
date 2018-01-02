#!/usr/bin/env node

function help(){
  console.log('\nnode-dtls-proxy\n\nusage:\n  $ dtls2udp <DTLS_LISTEN_PORT> <UDP_LISTEN_PORT>  <UDP_ENDPOINT> <UDP_ENDPOINT_PORT> \n\nexample:\n  $ dtls2udp 5684 5685 localhost 5683\n')
}

require('dotenv').config()
var endpoint = process.env.UDP_ENDPOINT
var endpointPort = process.env.UDP_ENDPOINT_PORT
var dtls_listen_port = process.env.DTLS_LISTEN_PORT
var udp_listen_port = process.env.UDP_LISTEN_PORT
var cert = process.env.DTLS_CERT
var key = process.env.DTLS_KEY

if (typeof(udp_listen_port) != "undefined" || typeof(dtls_listen_port) != "undefined" || typeof(endpoint) != "undefined" || typeof(endpointPort) != "undefined")
{}
else {
  dtls_listen_port = process.argv[2]
  udp_listen_port = process.argv[3]
  endpoint = process.argv[4]
  endpointPort = process.argv[5]
}


if (typeof(cert) == "undefined") {
  cert = "cert.crt"
}

if (typeof(key) == "undefined") {
  key = "cert.key"
}


if (typeof(udp_listen_port) == "undefined" || typeof(dtls_listen_port) == "undefined" || typeof(endpoint) == "undefined" || typeof(endpointPort) == "undefined"){
    help()
    process.exit()
}

console.log("[+] Starting DTLS2UDP Proxy")

const index = require('node-dtls-proxy');
const dgram = require('dgram');
try {
const dtls = index.createDTLSServer(cert,key,dtls_listen_port,"udp4")
}
catch (err) {
  if (err.code == "ENOENT") {
    console.log("Certificate and Key not found, generate new ones with the following command:\n  $ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.crt -subj '/CN=node-dtls-tunnel/O=m4n3dw0lf/C=BR'");
    process.exit(1)
  }
  else {
     throw err;
     process.exit(1)
  }
}

var dtls_socket;

udp = dgram.createSocket("udp4")
udp.bind(udp_listen_port)
console.log("UDP Server listening on port: ", udp_listen_port)


udp.on('message', function (msg, rinfo) {
  console.log("Encrypting UDP response from:",[rinfo.address,rinfo.port].join(":"), "and forwarding to  UDP2DTLS endpoint");
  dtls_socket.send(msg);
});


if (typeof(dtls) != "undefined") {
  dtls.on( 'secureConnection', function( socket ) {
    console.log("Got a DTLS Connection from:",[socket.rinfo.address,socket.rinfo.port].join(":"))
    socket.on( 'message', function( message ) {
      dtls_socket = socket
      console.log("Decrypting DTLS message from:", [socket.rinfo.address,socket.rinfo.port].join(":"), "and forwarding to UDP endpoint");
      udp.send(message, 0, message.length, endpointPort, endpoint)
    });
  });
}

