import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env";
import fastifySwagger from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import { getBooksRoute } from "./infra/http/get-books.route";
import { addBookRoute } from "./infra/http/add-book.route";
import { updateBookRoute } from "./infra/http/update-book.route";
import { deleteBookRoute } from "./infra/http/delete-book.route";

export const server = fastify().withTypeProvider<ZodTypeProvider>();

server.register(fastifyCors, {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

if (env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Bookly API",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(scalarAPIReference, {
    routePrefix: "/docs",
  });
}

server.register(getBooksRoute);
server.register(addBookRoute);
server.register(updateBookRoute);
server.register(deleteBookRoute);
