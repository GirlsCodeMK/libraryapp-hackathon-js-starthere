FROM node:10.15.0-alpine

WORKDIR /opt/app

COPY package.json .
RUN NODE_ENV=development npm install --quiet

COPY . .
RUN NODE_ENV=development npm run build

CMD ["npm", "start"]