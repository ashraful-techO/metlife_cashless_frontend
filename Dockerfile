# Install dependencies only when needed
FROM node:18.20.4-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18.20.4-alpine AS builder
WORKDIR /app

ENV METLIFE_CASHLESS_SERVICE=https://api.zaynax.health/bank_assurance

ENV NEXTAUTH_SECRET=fed0498f4326935d5ecac51173662ec5
ENV NEXTAUTH_URL=https://ba.zaynax.health




COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN export NODE_OPTIONS=--openssl-legacy-provider && yarn build && yarn install --production --ignore-scripts --prefer-offline
# Production image, copy all the files and run next
FROM node:18.20.4-alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER nextjs
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production
CMD ["yarn", "start"]