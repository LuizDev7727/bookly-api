import { server } from "./app";
import { env } from "./env";

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`);
  console.log(`📚 Swagger on http://localhost:${env.PORT}/docs`);
});
