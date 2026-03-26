FROM node:20-bullseye-slim

# Install dependensi sistem yang dibutuhkan: Git, Redis, dan curl
RUN apt-get update && apt-get install -y \
    git \
    redis-server \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Setup working directory aplikasi
WORKDIR /app

# COPY package.json dari direktori ai-agent-dev
COPY ai-agent-dev/package*.json ./
RUN npm install --production

# COPY seluruh source code bot dari direktori ai-agent-dev
COPY ai-agent-dev/ .

# Buat direktori data untuk persistent storage
RUN mkdir -p /data/mlite
VOLUME ["/data"]

# Beri hak eksekusi untuk entrypoint
RUN chmod +x entrypoint.sh

# Environment variables default
ENV REDIS_HOST=127.0.0.1
ENV REDIS_PORT=6379
ENV GIT_REPO_PATH=/data/mlite
ENV PORT=3000

EXPOSE $PORT

# Gunakan entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
