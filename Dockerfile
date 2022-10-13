FROM node:16-alpine AS builder
ENV NODE_ENV=production

# Create app directory - this is the workdir inside the container file system
WORKDIR /usr/src/app

# Install app dependencies
# wildcard is used to catch both package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
# if building for production:
# RUN npm ci --only=production

# Bundle app source
# Copying from root directory with first '.', into the WORKDIR specified above (second ".")
COPY . .

# Second stage in the mulit-stage build
# Used to run the application
FROM node:16-alpine

# Copy from the builder image
# Only files required to run the nest app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
 
# get our ts files compiled to js in dist
RUN npm i -g @nestjs/cli
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main"]