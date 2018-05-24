// import combineRouters from "koa-combine-routers";
// import membersRouter from "./admin/members";
// import authRouter from "./auth";

// const router = combineRouters([
//     membersRouter,
//     authRouter
// ]);

// export default router;
import * as passport from "koa-passport";
import Router from "koa-router";

const router = new Router();

router.get("/", async ctx => {
    ctx.body = "Hello world!";
});

module.exports = router;