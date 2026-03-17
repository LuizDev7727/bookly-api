import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getBooks } from "@/functions/get-books";

export const getBooksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/books",
    {
      schema: {
        querystring: z.object({
          cursor: z.string().optional(),
          author: z.string().optional(),
          status: z.enum(["Lendo", "Lido", "Quero ler"]).optional(),
        }),
      },
    },
    async (request, reply) => {
      const { cursor, author, status } = request.query;

      const { books, nextCursor } = await getBooks({ cursor, author, status });

      return reply.send({ books, nextCursor });
    },
  );
};
