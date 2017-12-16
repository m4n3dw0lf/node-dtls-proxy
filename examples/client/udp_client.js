var dgram = require('dgram');
var message = new Buffer('m4n3dw0lf');

var PORT = 5684;
var HOST = 'localhost';

var client = dgram.createSocket('udp4');

client.bind(5688);

client.on('message', function(msg, rinfo){
   console.log(msg.toString());
   client.close();
});

client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
});
