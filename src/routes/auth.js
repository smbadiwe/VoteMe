import passport from "koa-passport";
import Router from "koa-router";
import { MemberService } from "../db/services/members.service";

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
  return new MemberService().getById(id)
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); });
});

const router = new Router({ prefix: "/auth"});

// POST /login
router.post("/login", async ctx => {
    passport.authenticate("local", {
        successRedirect: "/app",
        failureRedirect: "/"
    });
});

router.get("/logout", async ctx => {
    console.log("/logout called");
    ctx.logout();
    ctx.redirect("/");
});

router.get("/facebook", async ctx => passport.authenticate("facebook"));

router.get(
    "/facebook/callback",
    async ctx => passport.authenticate("facebook", {
        successRedirect: "/app",
        failureRedirect: "/"
    })
);

router.get("/twitter", async ctx => passport.authenticate("twitter"));

router.get(
    "/twitter/callback",
    async ctx =>  passport.authenticate("twitter", {
        successRedirect: "/app",
        failureRedirect: "/"
    })
);

router.get("/google", async ctx => passport.authenticate("google"));

router.get(
    "/google/callback",
    async ctx => passport.authenticate("google", {
        successRedirect: "/app",
        failureRedirect: "/"
    })
);

// Don't change this to ES6 style. We use 'require' to auto-register routes
// See src/app.js
module.exports = router;
