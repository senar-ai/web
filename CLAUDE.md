# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development

- `npm run dev` - Start development server with file watching
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run fetch` - Fetch database from external source (senarai-db)

### Code Quality

- `npm run format` - Format code using pkode
- `npm run lint` - Lint code using pkode
- `npm run test` - Run tests using pkode
- `npm run test:update` - Update test snapshots

### CSS

- `npm run generate:css` - Generate Tailwind CSS
- `npm run dev:css` - Generate CSS with watch mode

### Database (Prisma)

- `npx prisma generate` - Update TypeScript definitions
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev --name <name>` - Generate migration
- `npx prisma migrate reset` - Reset migrations and run seed

### Deployment

- `npm run deploy` - Deploy to Deno Deploy

## Architecture Overview

This is a **Remix + Deno** application that serves as a learning resources directory ("Senarai"). Key architectural patterns:

### Tech Stack

- **Runtime**: Deno (not Node.js)
- **Framework**: Remix with React 17
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **Deployment**: Deno Deploy

### Project Structure

- `app/routes/` - Remix file-based routing
- `app/components/` - Reusable React components
- `app/model/` - Data models and business logic
- `app/utils/` - Utility functions
- `prisma/` - Database schema and migrations

### Data Flow

1. External data source fetched via `app/scripts/fetch-db.ts`
2. Data stored as JSON files in `app/data/`  
3. Database models in `app/model/` consume this data
4. Routes use loaders to provide data to components

### Key Components

- **Icon System**: Uses SVG sprites in `/public/images/` with `<Icon />` component
- **PageLayout**: Main layout wrapper with search functionality
- **ActionCards**: Grid display for categories/activities
- **Navigation**: Top navigation and breadcrumbs

### Dependencies Management

- Use `npm install` for NPM packages (not Deno modules)
- Deno modules can use URL imports or deps.ts
- Avoid import maps

### Icon Usage

FontAwesome icons via SVG sprites:

1. Add icons to FontAwesome kit
2. Upload SVG sprites to `/public/images/`
3. Use `<Icon set="solid|light|duotone" id="icon-name" />`

## Important Notes

- This uses **Deno**, not Node.js - commands run with Deno runtime
- Database fetching happens via external Google Sheets source
- The app is primarily a learning resources directory
- Uses file-based routing with Remix conventions
- Tailwind config includes custom color extensions
