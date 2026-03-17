import { server } from "@/app";
import { test, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

beforeAll(async () => {
  await server.ready();
});

afterAll(async () => {
  await server.close();
});

type GetBooksResponse = {
  books: {
    id: string;
    title: string;
    author: string;
    imageUrl: string | null;
    comment: string | null;
    stars: number | null;
    status: "Lendo" | "Lido" | "Quero ler" | null;
  }[];
  nextCursor: string | null;
};

test("should be able to get books", async () => {
  const createdIds: string[] = [];

  for (let i = 0; i < 2; i++) {
    const post = await request(server.server).post("/books").send({
      title: `Book ${i}`,
      author: "Test Author",
      status: "Lendo",
    });
    createdIds.push(post.body.bookId);
  }

  const response = await request(server.server).get("/books");

  expect(response.status).toBe(200);
  expect(response.body.books).toBeInstanceOf(Array);
  expect(response.body).toHaveProperty("nextCursor");

  for (const id of createdIds) {
    await request(server.server).delete(`/books/${id}`);
  }
});

test("should be able to filter books by author", async () => {
  const post = await request(server.server).post("/books").send({
    title: "Filtered Book",
    author: "Unique Author Filter",
    status: "Lido",
  });
  const bookId = post.body.bookId;

  const response = await request(server.server)
    .get("/books")
    .query({ author: "Unique Author Filter" });

  expect(response.status).toBe(200);
  expect(response.body.books).toBeInstanceOf(Array);
  expect(
    response.body.books.every(
      (b: { author: string }) => b.author === "Unique Author Filter",
    ),
  ).toBe(true);

  await request(server.server).delete(`/books/${bookId}`);
});

test("should be able to filter books by status", async () => {
  const post = await request(server.server).post("/books").send({
    title: "Status Book",
    author: "Some Author",
    status: "Quero ler",
  });
  const bookId = post.body.bookId;

  const response = await request(server.server)
    .get("/books")
    .query({ status: "Quero ler" });

  expect(response.status).toBe(200);
  expect(response.body.books).toBeInstanceOf(Array);
  expect(
    response.body.books.every(
      (b: { status: string }) => b.status === "Quero ler",
    ),
  ).toBe(true);

  await request(server.server).delete(`/books/${bookId}`);
});
