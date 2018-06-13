import Router from "koa-router";
import { ContestantService } from "../../db/services/contestants.service";
import * as validate from "./contestants.validate";

const router = new Router({ prefix: "/api" });

router.get("/contestants", async ctx => {
  const allContestants = await new ContestantService().getAll();
  if (!allContestants) {
    ctx.status = 503;
  } else {
    ctx.body = allContestants;
  }
});

router.get("/contestants/:id", async ctx => {
  try {
    const contestant = await new ContestantService().getById(ctx.params.id);
    if (!contestant) {
      ctx.status = 503;
    } else {
      ctx.body = contestant;
    }
  } catch (err) {
    console.log(err);
    ctx.body = "No contestant with the given id found.";
    ctx.status = 503;
  }
});

router.post("/contestants/add", async ctx => {
  const payload = ctx.request.body;
  try {
    validate.validateContestantOnAdd(payload);
  } catch (e) {
    ctx.body = e.message;
    ctx.status = e.status;
    return;
  }
  const newContestant = {
    member_id: payload.member_id,
    election_id: payload.election_id
  };

  try {
    await new ContestantService().save(newContestant);
  } catch (err) {
    console.log(err);
    ctx.body = "Error saving data.";
    ctx.status = 503;
  }
});

// console.log(router.stack.map(i => i));
// Don't change this to ES6 style. We use 'require' to auto-register routes
// See src/app.js
module.exports = router;
