FROM node:20
WORKDIR /usr/src/app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
CMD ["npm", "start"]
