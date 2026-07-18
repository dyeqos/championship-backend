# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN pnpm prune --prod

FROM node:24-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]