import Router from "koa-router";
import { ContestantService } from "../../db/services/contestants.service";

const router = new Router({ prefix: "/admin" });

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
  const newContestant = ctx.request.body;
  if (newContestant) {
    try {
      await new ContestantService().save(newContestant);
    } catch (err) {
      console.log(err);
      ctx.body = "Error saving data.";
      ctx.status = 503;
    }
  }
});

// Don't change this to ES6 style. We use 'require' to auto-register routes
// See src/app.js
module.exports = router;
