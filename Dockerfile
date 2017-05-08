FROM node:7-alpine

# Install Git
RUN apk add --no-cache bash

# Create app directory
COPY . /src
WORKDIR /src

EXPOSE  8080
CMD ["yarn", "start"]
