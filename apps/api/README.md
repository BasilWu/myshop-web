# myshop-api (NestJS + Prisma + PostgreSQL)

Backend API for **MyShop** — JWT auth, products, orders.  
Runs on **PORT=3001** by default.

## Tech Stack
- NestJS (HTTP REST)
- Prisma ORM + PostgreSQL
- JWT (Passport)
- pnpm

## Quick Start

```bash
pnpm install
cp .env.example .env
# (可選) 本機快速開 DB
# docker run --name pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=myshop -p 5432:5432 -d postgres:16

# 產生 Prisma Client（連到 DATABASE_URL）
pnpm prisma generate
# 初次建表（等 DB 起來後再跑）
# pnpm prisma migrate dev --name init

# 開發（預設 PORT=3001）
pnpm start:dev
# 測試
# curl http://localhost:3001/
