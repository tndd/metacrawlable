FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# Development stage
FROM base AS development
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# Test stage with Playwright
FROM mcr.microsoft.com/playwright:v1.53.0 AS test
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx playwright install
COPY . .
CMD ["npx", "playwright", "test"]