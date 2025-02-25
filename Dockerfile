FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm rebuild esbuild

COPY . .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
