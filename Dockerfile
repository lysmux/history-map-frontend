FROM oven/bun:1.2 AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bunx --bun vite build

FROM nginx:1.27-alpine AS release

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html/

EXPOSE 80/tcp

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
