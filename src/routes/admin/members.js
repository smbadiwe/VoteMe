import Router from "koa-router";
import { MemberService } from "../../db/services/members.service";
import * as validate from "./members.validate";
const router = new Router({ prefix: "/admin" });

router.get("/members", async ctx => {
  const allMembers = await new MemberService().getAll();
  if (!allMembers) {
    ctx.status = 503;
  } else {
    ctx.body = allMembers;
  }
});

router.get("/members/:id", async ctx => {
  try {
    const member = await new MemberService().getById(ctx.params.id);
    if (!member) {
      ctx.status = 503;
    } else {
      ctx.body = member;
    }
  } catch (err) {
    console.log(err);
    ctx.body = "No member with the given id found.";
    ctx.status = 503;
  }
});

router.post("/members/add", async ctx => {
  const payload = ctx.request.body;
  try {
    validate.validateMemberOnAdd(payload);
  } catch (e) {
    ctx.body = e.message;
    ctx.status = e.status;
    return;
  }
  const newMember = {
    email: payload.email,
    phone: payload.phone,
    lastname: payload.lastname,
    firstname: payload.firstname,
    regnumber: payload.regnumber
  };
  try {
    await new MemberService().save(newMember);
  } catch (err) {
    console.log(err);
    ctx.body = "Error saving data.";
    ctx.status = 503;
  }
});

// Don't change this to ES6 style. We use 'require' to auto-register routes
// See src/app.js
module.exports = router;
