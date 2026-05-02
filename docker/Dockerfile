# -----------------------------
# 1) Builder Stage
# -----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json .

# Install dependencies (all, including devDependencies)
RUN npm install

# Copy project source
COPY . .

# Build Next.js
RUN npm run build


# -----------------------------
# 2) Runner Stage (Production)
# -----------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Only copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy necessary build outputs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Expose port
EXPOSE 3000

# Run production mode
CMD ["npm", "start"]
