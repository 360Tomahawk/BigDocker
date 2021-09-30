FROM node:alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#needs some dependencies
COPY package*.json ./

#install npm
RUN npm install

#this adds the app
COPY . ./

#start app
CMD ["npm", "start"]