import { db } from "./client";
import { booksTable } from "./tables/books.table";
import { faker } from "@faker-js/faker";

async function seed() {
  console.log("🌱 Starting database seed...");

  const booksToInsert = Array.from({ length: 400 }).map(() => {
    return {
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      imageUrl: faker.image.url(),
      status: faker.helpers.arrayElement(["Lido", "Lendo", "Quero ler"]),
      stars: faker.number.int({ min: 0, max: 5 }),
      comment: faker.lorem.sentence(),
    };
  });

  await db.insert(booksTable).values(booksToInsert);
}

seed()
  .then(() => {
    console.log("✨ Seed completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  });
