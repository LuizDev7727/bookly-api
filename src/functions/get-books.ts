import { db } from "@/infra/db/client"
import { booksTable } from "@/infra/db/tables/books.table"
import { eq, and, lt, desc } from "drizzle-orm"

type GetBooksParams = {
  cursor?: string
  author?: string
  status?: "Lendo" | "Lido" | "Quero ler"
}

export async function getBooks({ cursor, author, status }: GetBooksParams) {
  const LIMIT_DEFAULT = 4

  const result = await db
    .select({
      id: booksTable.id,
      title: booksTable.title,
      author: booksTable.author,
      imageUrl: booksTable.imageUrl,
      comment: booksTable.comment,
      stars: booksTable.stars,
      status: booksTable.status,
    })
    .from(booksTable)
    .where(
      and(
        cursor ? lt(booksTable.id, cursor) : undefined,
        author ? eq(booksTable.author, author) : undefined,
        status ? eq(booksTable.status, status) : undefined
      )
    )
    .orderBy(desc(booksTable.id))
    .limit(LIMIT_DEFAULT + 1)

  const hasMore = result.length > LIMIT_DEFAULT
  const books = hasMore ? result.slice(0, LIMIT_DEFAULT) : result
  const nextCursor = hasMore ? books[books.length - 1].id : null

  return {
    books,
    nextCursor,
  }
}
