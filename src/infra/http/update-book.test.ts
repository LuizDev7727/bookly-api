import { server } from "@/app";
import { test, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

beforeAll(async () => {
  await server.ready();
});

afterAll(async () => {
  await server.close();
});

test("should be able to update a book", async () => {
  const post = await request(server.server).post("/books").send({
    title: "Original Title",
    author: "Original Author",
    status: "Quero ler",
  });

  const { bookId } = post.body;

  const response = await request(server.server).put(`/books/${bookId}`).send({
    title: "Updated Title",
    status: "Lendo",
    stars: 4,
  });

  expect(response.status).toBe(204);

  await request(server.server).delete(`/books/${bookId}`);
});

test("should be able to update only one field of a book", async () => {
  const post = await request(server.server).post("/books").send({
    title: "Partial Update Book",
    author: "Some Author",
    status: "Lendo",
  });

  const { bookId } = post.body;

  const response = await request(server.server).put(`/books/${bookId}`).send({
    comment: "Great read!",
  });

  expect(response.status).toBe(204);

  await request(server.server).delete(`/books/${bookId}`);
});
