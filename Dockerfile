FROM node:16-alpine

# Create app directory - this is the workdir inside the container file system
WORKDIR /usr/src/app

# Install app dependencies
# wildcard is used to catch both package.json and package-lock.json
COPY package*.json ./

RUN npm install
# if building for production:
# RUN npm ci --only=production

# Bundle app source
COPY . .

# get our ts files compiled to js in dist 
RUN npm run build

EXPOSE 8080
CMD ["node", "dist/main"]