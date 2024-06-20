#!/bin/bash

# Execute Prisma migrations
npm run prisma:migrate

# Generate Prisma client
run prisma:generate

# Start the application
npm run dev