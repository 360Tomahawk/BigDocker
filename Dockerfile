FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

#needs some dependencies
COPY package.json ./
COPY package-lock.json ./

#install npm
RUN npm install

#this adds the app
COPY . ./ 

#start app
CMD ["npm", "start"]