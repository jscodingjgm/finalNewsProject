FROM node:12

# Create app directory
WORKDIR /usr/src/app

ENV PORT=4000
ENV MONGODB_URL=mongodb://localhost:27017/update24DB
ENV JWT_KEY=MarvelNewsAuth2020

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]