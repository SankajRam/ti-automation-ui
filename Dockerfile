FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev --silent
RUN npm install react-scripts@5.0.1 --silent
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
