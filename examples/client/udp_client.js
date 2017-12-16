var PORT = 5684;
var HOST = 'localhost';

var dgram = require('dgram');
var message = new Buffer('I like to travel through Encrypted tunnels ;)');

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    client.close();
});
