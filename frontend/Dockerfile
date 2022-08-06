FROM node:18-alpine
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
RUN yarn install

COPY . .

CMD ["yarn", "dev"]