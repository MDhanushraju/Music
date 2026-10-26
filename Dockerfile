# ==============================================================================
# Tarang Radio - Multi-Stage Production Dockerfile
# Builds the Vite frontend and runs the lightweight Node.js API + Static Server
# ==============================================================================

# Stage 1: Build the Frontend Assets
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci || npm install

COPY frontend ./
RUN npm run build

# Stage 2: Production Server
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Install production backend dependencies
COPY backend/package*.json ./backend/
RUN npm --prefix backend ci --omit=dev || npm --prefix backend install --omit=dev

# Copy backend source code & schema
COPY backend/src ./backend/src
COPY backend/data ./backend/data

# Copy built frontend assets from stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose standard application port
EXPOSE 4000

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/api/v1/health || exit 1

# Start the unified production server
CMD ["node", "backend/src/server.js"]
