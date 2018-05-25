// import combineRouters from "koa-combine-routers";
// import membersRouter from "./admin/members";
// import authRouter from "./auth";

// const router = combineRouters([
//     membersRouter,
//     authRouter
// ]);

// export default router;
import Router from "koa-router";

const router = new Router();

router.get("/", async ctx => {
    ctx.body = "Hello world!";
});

// Don't change this to ES6 style. We use 'require' to auto-register routes
// See src/app.js
module.exports = router;