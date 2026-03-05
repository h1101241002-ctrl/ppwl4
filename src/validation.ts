import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi())
  .post("/request",
    ({ body }) => {
      return {
        message: "Success",
        data: body
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 3 }),
        email: t.String({ format: "email" }),
        age: t.Number({ minimum: 18 })
      })
    }
  )
  .listen(3000);

app.get(
  "/user/:id",
  ({ params }) => params,
  {
    params: t.Object({
      id: t.Number()
    })
  }
)

app.get(
  "/search",
  ({ query }) => query,
  {
    query: t.Object({
      keyword: t.String(),
      page: t.Optional(t.Number())
    })
  }
)


console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
