import { compare } from "bcrypt";
import passport from "koa-passport";
import compose from "koa-compose";
import jwt from "jsonwebtoken";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { MemberService, MemberPasswordService } from "./db/services";
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_SECRET
  // issuer: "accounts.examplesoft.com",
  // audience: "yoursite.net"
};

const strategy = new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    console.log("jwt_payload = ");
    console.log(jwt_payload);
    const username = jwt_payload.username;
    const password = jwt_payload.password;
    const user = await new MemberService().getByUsername(username);

    if (!user) {
      return done(null, false);
    }

    const pwd = await new MemberPasswordService().getCurrentPassword(user.id);
    if (!pwd) {
      return done(null, false);
    }
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
});

passport.use("jwt", strategy);

passport.serializeUser((user, done) => {
  console.log("passport.serializeUser - user = ");
  console.log(user);
  done(null, user.id); // could be a json of the relevant  properties.
});

passport.deserializeUser((id, done) => {
  console.log("passport.deserializeUser - id = ");
  console.log(id);
  return new MemberService()
    .getById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

export default function auth() {
  return compose([
    passport.initialize()
    //passport.session()
  ]);
}

export const localAuthHandler = (ctx, next) => {
  console.log("localAuthHandler");
  console.log(ctx.request.body);
  return passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    console.log("passport.authenticate prop 2 - user = ");
    console.log(user);
    console.log("passport.authenticate prop 2 - info = ");
    console.log(info);
    console.log("passport.authenticate prop 2 - err = ");
    console.log(err);
    if (user === false) {
      ctx.status = 401;
      ctx.body = info.message;
    } else {
      try {
        const { accessToken, refreshToken } = await generateTokens({ user }, options.secretOrKey);
        ctx.body = { accessToken, refreshToken };
      } catch (e) {
        ctx.throw(500, e);
      }
    }
  })(ctx, next);
};

/** After autentication using one of the strategies, generate a JWT token */
export function generateToken() {
  return async ctx => {
    console.log("generating token....");
    console.log(ctx.state);
    const { user } = ctx.state;
    if (user === false) {
      ctx.status = 401;
    } else {
      const _token = jwt.sign({ id: user.id }, options.secretOrKey);
      const token = `JWT ${_token}`;
      console.log("token:\t" + token);

      const currentUser = await new MemberService().getById(user.id);

      ctx.status = 200;
      ctx.body = {
        token,
        user: currentUser
      };
    }
  };
}
