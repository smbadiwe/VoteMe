import passport from "koa-passport";
import { MemberService } from "./db/services/members.service";

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
  return new MemberService().getById(id)
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); });
});
