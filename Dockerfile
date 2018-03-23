FROM node:6

RUN mkdir -p /var/app/current
WORKDIR /var/app/current
COPY . ./
RUN rm -rf ./node_modules
RUN npm install

EXPOSE 8333

