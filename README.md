# node-dtls-proxy

Node.js DTLS Proxy, library to connect plain-text UDP clients with plain-text UDP servers over an encrypted UDP tunnel..

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
$ sudo npm install -g
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.crt -subj '/CN=node-dtls-tunnel/O=m4n3dw0lf/C=BR'
```

## PoC

- Create 2 VMs, one for the Server and one for the Client and install the package.

### Server-side

- On a terminal
```
$ dtls2udp <DTLS_LISTEN_PORT> <UDP_LISTEN_PORT> <UDP_ENDPOINT_IP> <UDP_ENDPOINT_PORT> 

e.g:

$ dtls2udp 5684 5685 localhost 5683
```

- On another terminal
```
$ node examples/server/udp_server.js
```

### Client-side

- On a terminal
```
$ udp2dtls <UDP_LISTEN_PORT> <DTLS2UDP SERVER IP> <DTLS2UDP SERVER PORT>

e.g:

$ udp2dtls 5687 localhost 5684
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
udp2dtls    | [+] Starting UDP2DTLS Proxy
dtls2udp    | [+] Starting DTLS2UDP Proxy
udp2dtls    | UDP Server listening on port: 5687
dtls2udp    | DTLS Server listening on port: 5684
dtls2udp    | UDP Server listening on port:  5685
dtls2udp    | Got a DTLS Connection from: 127.0.0.1:55209
udp2dtls    | Encrypting UDP message from: 127.0.0.1:41585 and forwarding to DTLS2UDP endpoint
dtls2udp    | Decrypting DTLS message from: 127.0.0.1:55209 and forwarding to UDP endpoint
dtls2udp    | Encrypting UDP response from: 127.0.0.1:5683 and forwarding to  UDP2DTLS endpoint
udp2dtls    | Decrypting DTLS message and forwarding to UDP client: 127.0.0.1:41585
```
