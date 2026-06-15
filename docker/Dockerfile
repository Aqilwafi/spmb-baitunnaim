# -----------------------------
# Base Stage (Instalasi pnpm & turbo)
# -----------------------------
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Tambahkan baris ini untuk memastikan direktori bin ada dan dikenali
RUN mkdir -p $PNPM_HOME && \
    corepack enable && \
    corepack prepare pnpm@latest --activate && \
    pnpm config set store-dir /pnpm/store

RUN pnpm add -g turbo@^2
# -----------------------------
# Stage 1: Prune (Memilah kode berdasarkan nama aplikasi)
# -----------------------------
FROM base AS pruner
ARG APP_NAME 
WORKDIR /app
COPY . .
# Memotong kode monorepo hanya untuk aplikasi yang dipilih agar cache Docker optimal
RUN turbo prune ${APP_NAME} --docker

# -----------------------------
# Stage 2: Installer (Instalasi dependensi & Build)
# -----------------------------
FROM base AS installer
ARG APP_NAME
WORKDIR /app

# Ambil berkas package json dan lockfile hasil potongan pruner
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Ambil sisa source code penuh yang dibutuhkan untuk kompilasi
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo build --filter=${APP_NAME}...

# -----------------------------
# Stage 3: Runner (Production Image yang Super Ringan)
# -----------------------------
FROM node:22-alpine AS runner
ARG APP_NAME 
ENV APP_NAME=${APP_NAME}

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Amankan container dengan user non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Salin hasil kompilasi standalone secara dinamis sesuai aplikasi yang dipilih
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

USER nextjs

# Port default container (Bisa Anda petakan ke port berapa saja di luar)
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Menjalankan server target Next.js Standalone menggunakan exec form via sh shell
CMD ["sh", "-c", "node apps/${APP_NAME}/server.js"]