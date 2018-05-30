import { compare } from "bcrypt";
import passport from "koa-passport";
import { Strategy as LocalStrategy } from "passport-local";
import { MemberService, MemberPasswordService } from "./db/services";

passport.serializeUser((user, done) => {
  done(null, user.id); // could be a json of the relevant  properties.
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

const options = {};
passport.use(
  new LocalStrategy(options, async (username, password, done) => {
    try {
      const user = await new MemberService().getByUsername(username);

      if (!user) {
        return done(null, false);
      }

      const pwd = await new MemberPasswordService().getCurrentPassword(user.id);
      if (!pwd) {
        return done(null, false);
      }
      console.log(pwd);
      compare(password, pwd.passwordHash, (err, isValid) => {
        if (err) {
          console.log("Error trying to compare password: ");
          console.log(err);
          return done(err);
        }
        if (!isValid) {
          console.log("Invalid password");
          return done(null, false);
        }
        return done(null, user);
      });
    } catch (err) {
      console.log("Error trying to get user from db: ");
      console.log(err);
      return done(err);
    }
  })
);
