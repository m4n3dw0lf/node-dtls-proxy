var dgram = require('dgram');

var udp2dtls_port = 5687;
var udp2dtls_host = 'localhost';

var message = new Buffer('m4n3dw0lf');

var client = dgram.createSocket('udp4');

client.on('message', function(msg, rinfo){
   console.log(msg.toString());
   client.close();
});


client.send(message, 0, message.length, udp2dtls_port, udp2dtls_host);
