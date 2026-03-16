import { db } from "@/infra/db/client"
import { booksTable } from "@/infra/db/tables/books.table"
import { eq } from "drizzle-orm"

type UpdateBookParams = {
  id: string
  title?: string
  author?: string
  imageUrl?: string
  comment?: string
  stars?: number
  status?: "Lendo" | "Lido" | "Quero ler"
}

export async function updateBook({ id, ...data }: UpdateBookParams) {
  const [book] = await db
    .update(booksTable)
    .set(data)
    .where(eq(booksTable.id, id))
    .returning()

  return book
}
