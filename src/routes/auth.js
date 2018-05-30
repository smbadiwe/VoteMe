import passport from "koa-passport";
import Router from "koa-router";
import { MemberService } from "../db/services";

const router = new Router({ prefix: "/auth" });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return new MemberService()
    .getById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

// POST /login
router.post("/login", ctx => {
  return passport.authenticate("local", (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.body = { status: true, data: user };
    } else {
      ctx.status = 400;
      ctx.body = { status: false, message: 'No user match found.' };
    }
  })(ctx);
});
router.get("/logout", async ctx => {
  ctx.logout();
  ctx.body = { status: true };
});

router.get("/facebook", async ctx => passport.authenticate("facebook"));

router.get("/facebook/callback", async ctx =>
  passport.authenticate("facebook", {
    successRedirect: "/app",
    failureRedirect: "/"
  })
);

router.get("/twitter", async ctx => passport.authenticate("twitter"));

router.get("/twitter/callback", async ctx =>
  passport.authenticate("twitter", {
    successRedirect: "/app",
    failureRedirect: "/"
  })
);

router.get("/google", async ctx => passport.authenticate("google"));

router.get("/google/callback", async ctx =>
  passport.authenticate("google", {
    successRedirect: "/app",
    failureRedirect: "/"
  })
);

// Don't change this to ES6 style. We use 'require' to auto-register routes
// See src/app.js
module.exports = router;
