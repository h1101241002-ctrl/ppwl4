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

app.get(
  "/products/:id",
  ({params, query}) => {
    return{
      id: params.id,
      sort:query.sort,
      name:query.name,
      status: "success"
    }
  },
  {
    params: t.Object({
      id:t.Numeric()
    }),
    query:t.Object({
      sort:t.Union([
        t.Literal("asc"),
        t.Literal("desc")
      ]),
      name: t.String()
    }),
    response:t.Object({
      id:t.Number(),
      sort:t.String(),
      name:t.String(),
      status:t.String()
    })
  }
)

app.get(
  "/ping",
  () => {
    return {
      success: true,
      message: "Server OK"
    }
  },
  {
    response: t.Object({
      success: t.Boolean(),
      message: t.String()
    })
  }
)

app.get(
  "/stats",
  () => {
    return {
      total: 1975,
      active: 85
    }
  },
  {
    response: t.Object({
      total: t.Number(),
      active: t.Number()
    })
  }
)

.listen(3000);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
