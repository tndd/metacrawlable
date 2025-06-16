# Multi-stage build for Next.js optimization
FROM node:18-alpine AS base

# Install dependencies only when needed
RUN apk add --no-cache libc6-compat wget
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci --only=production; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Development stage
FROM node:18-alpine AS development
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
EXPOSE 3000
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# Test stage with Playwright
FROM mcr.microsoft.com/playwright:v1.53.0-focal AS test
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
# Install Playwright browsers
RUN npx playwright install
EXPOSE 3000
CMD ["npm", "run", "test"]

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]