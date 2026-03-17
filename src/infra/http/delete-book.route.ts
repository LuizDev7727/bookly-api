import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { deleteBook } from "@/functions/delete-book";

export const deleteBookRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/books/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      await deleteBook(id);

      return reply.status(204).send();
    },
  );
};
