import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

function globalMiddleware(ctx, next: Koa.Next) {
  console.log("Global middleware");
  next();
}

app.use(globalMiddleware);

function handleUrl(ctx, next: Koa.Next) {
  console.log(ctx.url);
  next();
}
function handleRequestTime(ctx, next: Koa.Next) {
  console.log(new Date().toLocaleString());
  next();
}

router.get("/", handleUrl, handleRequestTime, (ctx, next) => {
  ctx.body = "Hello root!";
});

router.get("/about", handleUrl, handleRequestTime, (ctx, next) => {
  ctx.body = "Hello about!";
});

app.use(router.routes());
app.listen(3000, () => {
  console.log("Example app listening on port 3000!, http://localhost:3000/");
});
