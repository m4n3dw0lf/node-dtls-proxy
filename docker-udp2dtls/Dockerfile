from node:boron

RUN git clone https://github.com/m4n3dw0lf/node-dtls-tunnel

WORKDIR node-dtls-tunnel

RUN npm install

RUN npm install -g

COPY udp2dtls.sh .

CMD ["/bin/bash","udp2dtls.sh"]



