# Bookly API

REST API for managing a personal book library. Built with Fastify, TypeScript, PostgreSQL, and Drizzle ORM.

https://github.com/user-attachments/assets/626cb3db-45d3-400a-bdbb-b7b0510579a1

## Stack

- **Runtime:** Node.js 22+
- **Framework:** Fastify 5
- **Language:** TypeScript 5
- **Database:** PostgreSQL + Drizzle ORM
- **Validation:** Zod
- **Testing:** Vitest + Supertest
- **Package Manager:** pnpm

## Project Structure

```
src/
├── app.ts                  # Fastify app configuration
├── server.ts               # Server entry point
├── env.ts                  # Environment variable schema
├── functions/              # Business logic
│   ├── get-books.ts
│   ├── add-book.ts
│   ├── update-book.ts
│   └── delete-book.ts
└── infra/
    ├── db/
    │   ├── client.ts       # Drizzle client
    │   ├── seed.ts         # Database seed script
    │   └── tables/
    │       └── books.table.ts
    └── http/               # Routes and tests
        ├── get-books.route.ts
        ├── get-books.test.ts
        ├── add-book.route.ts
        ├── add-book.test.ts
        ├── update-book.route.ts
        ├── update-book.test.ts
        ├── delete-book.route.ts
        └── delete-book.test.ts
drizzle/
└── migrations/             # SQL migration files
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm
- Docker (for PostgreSQL)

### Setup

```bash
# Install dependencies
pnpm install

# Start the database
docker-compose up -d

# Run migrations
pnpm run db:migrate

# (Optional) Seed the database with 400 sample books
pnpm run db:seed

# Start development server
pnpm run dev
```

The server will be available at `http://localhost:3030`.
API documentation (Scalar) is available at `http://localhost:3030/docs`.

### Environment Variables

Create a `.env` file at the project root:

```env
DATABASE_URL=postgresql://bookly:bookly@localhost:5432/bookly
NODE_ENV=development
PORT=3030
```

| Variable       | Required | Default         | Description                          |
|----------------|----------|-----------------|--------------------------------------|
| `DATABASE_URL` | Yes      | —               | PostgreSQL connection URL            |
| `NODE_ENV`     | No       | `development`   | `development` or `production`        |
| `PORT`         | No       | `3030`          | HTTP server port                     |

## API Endpoints

<img width="1919" height="1079" alt="bookly-api-doc" src="https://github.com/user-attachments/assets/e72b0606-c213-4e25-a46b-6f799d846939" />

### GET /books

Returns a paginated list of books with optional filtering.

**Query Parameters:**

| Parameter | Type                              | Description                       |
|-----------|-----------------------------------|-----------------------------------|
| `cursor`  | `string`                          | Cursor for keyset pagination      |
| `author`  | `string`                          | Filter by author name             |
| `status`  | `"Lendo" \| "Lido" \| "Quero ler"` | Filter by reading status         |

**Response `200`:**
```json
{
  "books": [
    {
      "id": "019687ab-...",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "imageUrl": "https://...",
      "comment": "Great book",
      "stars": 5,
      "status": "Lido"
    }
  ],
  "nextCursor": "019687ac-..."
}
```

Returns 12 books per page. Pass `nextCursor` as the `cursor` parameter to fetch the next page.

---

### POST /books

Creates a new book.

**Request Body:**
```json
{
  "title": "string",         // required
  "author": "string",        // required
  "imageUrl": "string",      // optional
  "comment": "string",       // optional
  "stars": 0,                // optional, default 0
  "status": "Quero ler"      // optional
}
```

**Response `201`:**
```json
{
  "bookId": "019687ab-..."
}
```

---

### PUT /books/:id

Updates an existing book.

**URL Parameter:** `id` — book UUID

**Request Body:** Same fields as POST (all optional).

**Response `204`:** No content.

---

### DELETE /books/:id

Deletes a book.

**URL Parameter:** `id` — book UUID

**Response `204`:** No content.

## Database

### Schema

```typescript
books {
  id        text        PK  // UUID v7, auto-generated
  title     varchar     NOT NULL
  author    varchar     NOT NULL
  image_url varchar
  comment   text
  stars     integer         // default 0
  status    post_status     // enum: 'Lendo' | 'Lido' | 'Quero ler'
}
```

### Commands

```bash
pnpm run db:generate   # Generate migrations from schema changes
pnpm run db:migrate    # Apply pending migrations
pnpm run db:seed       # Seed database with 400 sample books
pnpm run db:ui         # Open Drizzle Studio (visual DB browser)
```

## Testing

```bash
pnpm run test
```

Tests are colocated with their routes in `src/infra/http/`. Each route has a corresponding `*.test.ts` file that tests the endpoint via HTTP assertions.

## Scripts

| Script           | Description                          |
|------------------|--------------------------------------|
| `pnpm dev`       | Start dev server with hot reload     |
| `pnpm test`      | Run test suite                       |
| `pnpm db:generate` | Generate migrations from schema    |
| `pnpm db:migrate`  | Apply migrations to the database   |
| `pnpm db:seed`     | Seed database with sample data     |
| `pnpm db:ui`       | Open Drizzle Studio                |
