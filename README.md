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
$ node bin/dtls2udp.js <DTLS_LISTEN_PORT> <UDP_LISTEN_PORT> <UDP_ENDPOINT_IP> <UDP_ENDPOINT_PORT> 

e.g:

$ node bin/dtls2udp 5684 5685 localhost 5683
```

- On another terminal
```
$ node examples/server/udp_server.js
```

### Client-side

- On a terminal
```
$ node bin/udp2dtls <UDP_LISTEN_PORT> <DTLS2UDP SERVER IP> <DTLS2UDP SERVER PORT>

e.g:

$ node bin/udp2dtls.js 5686 5687 localhost 5684
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
```
