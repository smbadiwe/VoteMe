import Koa from "koa";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import passport from "koa-passport";
import session from "koa-session";
import "./auth";
import { listFilesInFolderRecursively } from "./utils";

const app = new Koa();

// check out https://www.npmjs.com/package/koa-helmet#usage
app.use(helmet());

// sessions
app.keys = ["secret", "key"];
app.use(session(app));

// To make the POST request in KOA, we need to 
// install the koa-bodyparser package otherwise 
// ctx.request.body would come undefined.
app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(async (ctx, next) => {
  console.log("calling " + ctx.url);
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

const files = listFilesInFolderRecursively(
  require("path").join(__dirname, "routes")
);
files.forEach(item => {
  if (item && !item.endsWith('.validate.js')) {
    item = item.replace("src", ".");
    const router = require(item);
    app.use(router.routes());
  }
});

export default app;
