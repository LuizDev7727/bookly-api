import { integer, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const booksEnum = pgEnum("post_status", ["Lendo", "Lido", "Quero ler"]);

export const booksTable = pgTable("books", {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  title: varchar().notNull(),
  author: varchar().notNull(),
  imageUrl: varchar("image_url"),
  comment: text(),
  stars: integer().default(0),
  status: booksEnum(),
});
