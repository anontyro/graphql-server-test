# SETUP
FROM node:10-alpine AS builder

WORKDIR /home/node/app
COPY . .
RUN npm install && npm run build

# RUN IMAGE
FROM node:10-alpine
ENV NODE-ENV=production
WORKDIR /home/node/app

COPY ./package* ./
RUN npm install && \
  npm cache clean --force

COPY --from=builder /home/node/app/build ./build

# Expose the port the app is running on
EXPOSE 4000

CMD npm run prod:server