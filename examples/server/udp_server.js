const index = require('../../')
  , udp = index.createUDPServer(5683,"udp4")

udp.on('message', function (message, rinfo) {
   console.log("Got connection from:",[rinfo.address,rinfo.port].join(":"))
   console.log("Sending response");
   var response = "Hello " + message + ", seems that you like to travel through encrypted tunnels ;)"
   udp.send(response,0,response.length,rinfo.port,rinfo.address);
});

