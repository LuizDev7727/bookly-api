import { server } from "@/app";
import { test, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

beforeAll(async () => {
  await server.ready();
});

afterAll(async () => {
  await server.close();
});

type AddBookResponse = {
  bookId: string;
};

test("should be able to add a book", async () => {
  const response = await request(server.server).post("/books").send({
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "Lido",
    stars: 5,
    comment: "Excellent book",
  });

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("bookId");
  expect(typeof response.body.bookId).toBe("string");

  await request(server.server).delete(`/books/${response.body.bookId}`);
});

test("should not be able to add a book without required fields", async () => {
  const response = await request(server.server).post("/books").send({
    title: "Missing Author",
  });

  expect(response.status).toBe(400);
});
