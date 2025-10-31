# Dockerfile для frontend (Next.js 14)
FROM node:20-alpine

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app

EXPOSE 3000
CMD ["npm", "run", "dev"]