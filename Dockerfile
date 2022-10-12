FROM node:16.14.2-alpine
ENV NODE_ENV=production

# Create app directory - this is the workdir inside the container file system
WORKDIR /usr/src/app

# Install app dependencies
# wildcard is used to catch both package.json and package-lock.json
COPY package*.json ./

RUN npm install --omit=dev
# if building for production:
# RUN npm ci --only=production

# Bundle app source
# Copying from root directory with first '.', into the WORKDIR specified above (second ".")
COPY . .

# get our ts files compiled to js in dist
RUN npm i -g @nestjs/cli
RUN npm run build

EXPOSE 8080
CMD ["node", "dist/main"]