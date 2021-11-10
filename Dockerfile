FROM node:16.13.0-0alpine3.12

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