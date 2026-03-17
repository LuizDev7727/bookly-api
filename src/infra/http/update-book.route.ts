import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { updateBook } from "@/functions/update-book";

export const updateBookRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/books/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string().optional(),
          author: z.string().optional(),
          imageUrl: z.string().optional(),
          comment: z.string().optional(),
          stars: z.number().int().optional(),
          status: z.enum(["Lendo", "Lido", "Quero ler"]).optional(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { title, author, imageUrl, comment, stars, status } = request.body;

      await updateBook({ id, title, author, imageUrl, comment, stars, status });

      return reply.status(204).send();
    },
  );
};
