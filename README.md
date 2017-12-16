# node-dtls-tunnel

Node.js DTLS Tunnel, library to connect plain-text UDP clients with plain-text UDP servers over an encrypted UDP tunnel..

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
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.crt -subj '/CN=node-dtls-tunnel/O=node-dtls-tunnel/C=BR'
```

## PoC

### Server-side

- On a terminal
```
$ node examples/server/dtls2udp.js
```

- On another terminal
```
$ node examples/server/udp_server.js
```

### Client-side

- On a terminal
```
$ node examples/client/udp2dtls.js <REMOTE DTLS SERVER>
```

- On another terminal
```
$ node examples/client/udp_client.js
```
