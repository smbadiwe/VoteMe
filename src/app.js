import Koa from "koa";
import session from "koa-session";
import passport from "koa-passport";
import bodyParser from "koa-bodyparser";
import { listFilesInFolderRecursively } from "./utils";
//import router from "./routes/index";
const app = new Koa();

// sessions
app.keys = ["secret", "key"];
app.use(session(app));

app.use(bodyParser());

// authentication
require('./auth');
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
  //console.log(item);
  if (!item.endsWith("candidates.js")) {
    item = item.replace("src", ".");
    const router = require(item);
    app.use(router.routes());
  }
});

export default app;
