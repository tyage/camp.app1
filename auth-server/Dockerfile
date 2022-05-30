FROM node:18

COPY package.json /src/package.json
RUN cd /src; npm install

COPY . /src
WORKDIR /src

CMD ["npm", "start"]