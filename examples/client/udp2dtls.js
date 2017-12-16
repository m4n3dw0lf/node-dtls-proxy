endpoint = process.argv[2]
if (typeof(endpoint) == "undefined"){
  console.log("You need to specify the DTLS Server endpoint\nusage:\n  node udp2dtls.js <DTLS_SERVER>")
  process.exit()
}
endpointPort = 5685

const index = require('../../')
  , udp = index.createUDPServer(5684,"udp4")
  , dtls = require('node-dtls')


var client = dtls.connect( endpointPort, endpoint, 'udp4')
udp.on('message', function (message, rinfo) {
  console.log("Forwarding UDP message from:", rinfo.address, "to DTLS endpoint:", endpoint);
  client.send(message)
});

