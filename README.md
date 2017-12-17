# node-dtls-proxy

Node.js DTLS Tunnel, library to connect plain-text UDP clients with plain-text UDP servers over an encrypted UDP tunnel..

![](https://img.shields.io/badge/version-beta-green.svg)

## Requirements

- nodejs version 4 or higher
- npm

### Nodejs and NPM installation:
```
$ sudo apt-get install nodejs nodejs-legacy npm
```

### Checking Nodejs version:
```
$ node --version
```

### Upgrading Nodejs to version 4x:
```
wget -qO- https://deb.nodesource.com/setup_4.x | sudo bash -
sudo apt-get install nodejs
```

## Package Installation

```
$ git clone https://github.com/m4n3dw0lf/node-dtls-tunnel
$ cd node-dtls-tunnel
$ npm install
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.crt -subj '/CN=node-dtls-tunnel/O=m4n3dw0lf/C=BR'
```

## PoC

- Create 2 VMs, one for the Server and one for the Client and install the package.

### Server-side

- On a terminal
```
$ node bin/dtls2udp.js <Udp2Dtls Server>
```

- On another terminal
```
$ node examples/server/udp_server.js
```

### Client-side

- On a terminal
```
$ node bin/udp2dtls.js <Dtls2Udp Server>
```

- On another terminal
```
$ node examples/client/udp_client.js
```

## Docker-Compose PoC

### run `docker-compose up`

> NOTE: remember to generate the certificate and key pair

this will start the dtls2udp and udp2dtls proxies.

for real scenarios, you will need to split the dtls2udp service in one server and the udp2dtls service to the other server.

### Start the UDP Server sample

```
$ node examples/server/udp_server.js
```

### Request using the UDP Client sample

```
$ node examples/client/udp_client.js
```

### Check the result on the docker-compose output

```
dtls2udp    | DTLS Server listening on port: 5685
dtls2udp    | UDP Server listening on port:  5686
udp2dtls    | UDP Server listening on port: 5684
udp2dtls    | DTLS Server listening on port: 5687
dtls2udp    | Got a DTLS Connection from: 127.0.0.1:37471
udp2dtls    | Got a DTLS Connection from: 127.0.0.1:39233
udp2dtls    | Forwarding UDP message from: 127.0.0.1:5688 to DTLS server: localhost:5685
dtls2udp    | Forwarding DTLS message from: 127.0.0.1:37471 to UDP endpoint: 127.0.0.1:5683
dtls2udp    | Forwarding UDP response over DTLS from: 127.0.0.1:5683 to DTLS endpoint: localhost:5687
udp2dtls    | Forwarding DTLS message from: 127.0.0.1:39233 to UDP client: 127.0.0.1:5688
```
