# Etapa 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Instalar OpenSSL (necesario para Prisma)
RUN apt-get update && apt-get install -y openssl

# Copiar config base
COPY package*.json tsconfig.json ./

# Instalar TODAS las dependencias en el builder (incluye dev)
RUN npm install --no-fund --no-audit

# Copiar resto del código
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build && npx tsc-alias

# Etapa 2: Producción / Desarrollo
FROM node:20-slim

WORKDIR /app

# Instalar OpenSSL en runtime
RUN apt-get update && apt-get install -y openssl

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

# Instalar dependencias según el entorno
RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install --no-fund --no-audit; \
    else \
      npm install --only=production --no-fund --no-audit; \
    fi \
    && npm install tsconfig-paths

# Copiar archivos necesarios desde el builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/.env .env
COPY --from=builder /app/src/infrastructure/http/docs ./dist/infrastructure/http/docs

EXPOSE 3000

CMD ["node", "-r", "tsconfig-paths/register", "dist/infrastructure/http/server.js"]
