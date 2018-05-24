import { MemberService } from "../../db/services/members.service";
import Router from "koa-router";

const router = new Router({ prefix: "/admin"});

router.get("/members", async ctx => {
  const result = await new MemberService().getAll();
  if (!result || result.error) {
    ctx.body = result.data.message;
    ctx.status = 503;
  } else {
    ctx.body = result.data;
  }
});

module.exports = router;