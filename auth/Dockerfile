# build stage
FROM node:18-alpine as builder
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

# production stage
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules/ .
COPY . .

CMD ["yarn", "start"]