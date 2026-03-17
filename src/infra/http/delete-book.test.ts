import { server } from "@/app";
import { test, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

beforeAll(async () => {
  await server.ready();
});

afterAll(async () => {
  await server.close();
});

test("should be able to delete a book", async () => {
  const post = await request(server.server).post("/books").send({
    title: "Book to Delete",
    author: "Some Author",
    status: "Lido",
  });

  const { bookId } = post.body;

  const response = await request(server.server).delete(`/books/${bookId}`);

  expect(response.status).toBe(204);
});

test("should return 204 even when deleting a non-existent book", async () => {
  const response = await request(server.server).delete(
    "/books/01960000-0000-7000-0000-000000000000",
  );

  expect(response.status).toBe(204);
});
