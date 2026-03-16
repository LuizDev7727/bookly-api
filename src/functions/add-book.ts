import { db } from "@/infra/db/client";
import { booksTable } from "@/infra/db/tables/books.table";

type AddBookParams = {
  title: string;
  author: string;
  imageUrl?: string;
  comment?: string;
  stars?: number;
  status?: "Lendo" | "Lido" | "Quero ler";
};
type AddBookResponse = {
  bookId: string;
};

export async function addBook(params: AddBookParams): Promise<AddBookResponse> {
  const [{ id }] = await db
    .insert(booksTable)
    .values(params)
    .returning({ id: booksTable.id });

  return { bookId: id };
}
