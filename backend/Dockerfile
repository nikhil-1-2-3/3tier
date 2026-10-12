FROM node:20-alpine

WORKDIR /app

# Install OpenSSL and compatibility libraries required by Prisma engine
RUN apk add --no-cache openssl libc6-compat

# Copy dependency manifests
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy application source code
COPY . .

EXPOSE 5000

# Run migrations, seed data, and launch server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run prisma:seed && node server.js"]
