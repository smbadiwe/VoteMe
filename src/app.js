import Koa from "koa";
import KeyGrip from "keygrip";

import middleware from "./middleware";
import auth from "./auth";
import routes from "./routes";

const app = new Koa();

const keys = [process.env.APP_SECRET];
app.keys = new KeyGrip(keys, "sha256");

app.use(middleware());
app.use(routes());
// Finally
app.use(ctx => (ctx.status = 404));
app.on("error", (err, ctx) => {
  console.log(`Error processing request: ${ctx.request.method} ${ctx.request.url}...`);
  console.log(err);
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
});
export default app;
