const index = require('../../')
  , udp = index.createUDPServer(5683,"udp4")

udp.on('message', function (message, rinfo) {
   console.log(message.toString());
   response = "Hello,",message
   udp.send(response,0,response.length,rinfo.port,rinfo.address);
});

