import { db } from "@/infra/db/client"
import { booksTable } from "@/infra/db/tables/books.table"
import { eq } from "drizzle-orm"

export async function deleteBook(id: string) {
  const [book] = await db
    .delete(booksTable)
    .where(eq(booksTable.id, id))
    .returning()

  return book
}
