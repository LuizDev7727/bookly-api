import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { addBook } from "@/functions/add-book";

export const addBookRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/books",
    {
      schema: {
        body: z.object({
          title: z.string(),
          author: z.string(),
          imageUrl: z.string().optional(),
          comment: z.string().optional(),
          stars: z.number().int().optional(),
          status: z.enum(["Lendo", "Lido", "Quero ler"]).optional(),
        }),
        response: {
          201: z.object({
            bookId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, author, imageUrl, comment, stars, status } = request.body;

      const { bookId } = await addBook({
        title,
        author,
        imageUrl,
        comment,
        stars,
        status,
      });

      return reply.status(201).send({ bookId });
    },
  );
};
