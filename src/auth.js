import { compare } from "bcrypt";
import passport from "koa-passport";
import { Strategy as LocalStrategy } from "passport-local";
import { MemberService } from "./db/services/members.service";


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
  new LocalStrategy(options, (username, password, done) => {
    new MemberService()
      .getByUsername(username)
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        compare(password, user.passwordHash, (err, isValid) => {
          if (err) {
            return done(err);
          }
          if (!isValid) {
            return done(null, false);
          }
          return done(null, user);
        });
      })
      .catch(err => {
        return done(err);
      });
  })
);
