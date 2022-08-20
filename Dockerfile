# build stage
FROM node:16.17-alpine as build-stage
WORKDIR /usr/src/build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:16.17-alpine as production-stage
WORKDIR /usr/src/app
COPY --from=build-stage /usr/src/build/node_modules ./node_modules
COPY --from=build-stage /usr/src/build/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"] 