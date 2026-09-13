# Визитка: API моего резюме

Backend, который отдаёт моё резюме одним GraphQL-запросом: профиль, навыки,
опыт работы и проекты. Данные лежат в PostgreSQL, схема описана в Prisma,
всё упаковано в Docker и поднимается одной командой.

## Как запустить

Нужен только Docker.

```bash
docker compose up --build
```

При первом старте сами создаются и база, и таблицы, и данные (сид выполняется
внутри контейнера). Повторный запуск не создаёт дубли — сид проверяет,
есть ли уже профиль.

Проверить можно двумя способами:

- открыть http://localhost:3000/graphql — там Apollo Sandbox, где запрос
  собирается мышкой по схеме;
- либо сразу curl'ом:

```bash
curl -X POST http://localhost:3000/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ profile { name description githubUrl skills { name } experience { company position } projects { name } } }"}'
```

## Стек

- **NestJS** — каркас: модули, DI, резолверы
- **GraphQL** (Apollo) — единственная точка входа `/graphql`, code-first схема
- **Prisma** — контракт-схема в `src/prisma/contract.prisma`, типизированный клиент
- **PostgreSQL 17** — поднимается вместе с приложением через docker compose
- **Docker** — `Dockerfile` + `compose.yaml`, healthcheck у БД, сид при старте

## Структура

```
src/
  app.module.ts        # корневой модуль, здесь подключается GraphQL
  prisma/
    contract.prisma    # модели: Profile, Skill, Experience, Project
    db.ts              # клиент Prisma (синглтон)
    prisma.service.ts  # обёртка для DI + закрытие соединения
    seed.ts            # заполнение данными резюме
  profile/
    profile.types.ts   # GraphQL-типы (схема генерируется из них)
    profile.resolver.ts
    profile.service.ts # вся логика запросов
    profile.controller.ts
```

Слои разделены: резолвер только принимает запрос, сервис ходит в базу,
GraphQL-типы не знают про Prisma, Prisma — про GraphQL.

## Локальный запуск без Docker

Понадобится Node.js 24+ и PostgreSQL 15+:

```bash
pnpm install
cp .env.example .env        # и вписать свои креды БД
pnpm prisma contract emit
pnpm prisma db init
pnpm run seed
pnpm run start:dev
```
