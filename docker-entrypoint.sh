#!/bin/sh
set -e

pnpm prisma db init --yes
node dist/prisma/seed.js

node dist/main.js
