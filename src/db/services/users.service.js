import { BaseEntityService } from "./baseentity.service";
import { UserRoleService, PermissionService, UserPasswordService } from "./";
import { RequestError, Required } from "../../ValidationErrors";
import { sign, verify } from "jsonwebtoken";
import { compare, hashSync, genSaltSync } from "bcrypt";
import Emailer from "../../Emailer";

export default class UserService extends BaseEntityService {
  constructor() {
    super("users");
  }

  async processUserRegistration(userRegInfo) {
    const existing = await this.getByUsername(userRegInfo.email);
    if (existing && !existing.disabled) {
      throw new RequestError("Sorry, we already have someone with the email address specified.");
    }

    let userId = 0;
    if (existing) {
      // => it's disabled, so it has not been used
      userId = existing.id;
      let callUpdate = false;
      if (existing.firstname !== userRegInfo.firstname) {
        existing.firstname = userRegInfo.firstname;
        callUpdate = true;
      }
      if (existing.middlename !== userRegInfo.middlename) {
        existing.middlename = userRegInfo.middlename;
        callUpdate = true;
      }
      if (existing.lastname !== userRegInfo.lastname) {
        existing.lastname = userRegInfo.lastname;
        callUpdate = true;
      }

      if (callUpdate) {
        await this.update(existing);
      }
    } else {
      const savedUserId = await this.save({
        firstname: userRegInfo.firstname,
        middlename: userRegInfo.middlename,
        lastname: userRegInfo.lastname,
        email: userRegInfo.email,
        regnumber: "" + Math.random(100, 1000) + Date.now(),
        disabled: true
      });
      userId = savedUserId[0];
    }
    const pwd = {
      passwordHash: hashSync(userRegInfo.password, genSaltSync()),
      userId: userId
    };
    await new UserPasswordService().save(pwd);

    const userInfo = { u: pwd.userId, p: pwd.passwordHash };
    const token = sign(userInfo, process.env.APP_SECRET, { expiresIn: "20m" });

    // Email the token
    const verifyUrl = `${userRegInfo.url}?token=${token}`;
    const viewData = { title: "Verify Email Address", url: verifyUrl };
    const options = { to: userRegInfo.email, subject: viewData.title };
    const sent = await new Emailer().sendEmail(options, "verifyemail.html", viewData);
    console.log("Email sender returned: ");
    console.log(sent);
  }

  async verifyUser(registrationToken) {
    if (!registrationToken) throw new Required("registrationToken");
    const userInfo = verify(registrationToken, process.env.APP_SECRET);
    if (!userInfo) {
      throw new RequestError("Invalid registration token", 401);
    }
    //{ u: pwd.userId, p: pwd.passwordHash }
    const user = await this.getById(userInfo.u);
    if (!user || !user.disabled) {
      throw new RequestError("Fake registration token", 401);
    }
    user.disabled = false;
    await this.update(user);
  }

  async getByUsername(email) {
    return await this.connector
      .table(this.tableName)
      .where({ email: email })
      .first();
  }

  async authenticatedUser(email) {
    return await this.connector
      .table(`${this.tableName} as u`)
      .innerJoin("userpasswords as up", "u.id", "=", "up.userId")
      .select(
        "u.id",
        "u.email",
        "u.firstname",
        "u.lastname",
        "u.roles",
        "u.disabled",
        "u.deleted",
        "up.passwordHash",
        "up.passwordsetdate"
      )
      .where({ "u.email": email })
      .orderBy("up.passwordsetdate", "desc")
      .first();
  }

  async processLogin(username, password, rememberme) {
    const userAuthInfo = await this.authenticatedUser(username);
    if (!userAuthInfo) {
      throw new RequestError("Username or password incorrect");
    }
    if (userAuthInfo.disabled) {
      throw new RequestError("Account not yet verified or enabled");
    }

    const isValid = await compare(password, userAuthInfo.passwordHash);
    if (isValid) {
      const roleIds = [];
      if (userAuthInfo.roles) {
        roleIds = userAuthInfo.roles.split(",");
      }
      const permissionIdsSet = new Set();
      const roleNames = "";
      const rolesObj = await new UserRoleService().getByIds(roleIds);
      if (rolesObj && rolesObj.length > 0) {
        rolesObj.forEach(r => {
          if (r.permissionIds) {
            const pids = r.permissionIds.split(",");
            pids.forEach(p => {
              roleNames += `${p.name}, `;
              permissionIdsSet.add(p);
            });
          }
        });
        roleNames = roleNames.substring(0, roleNames.length - 3);
      }
      const permissions = await new PermissionService().getByIds([...permissionIdsSet]);
      const userPermissions = [];
      if (permissions && permissions.length > 0) {
        permissions.forEach(p => {
          userPermissions.push(p.name);
        });
      }
      // jwt sign
      //TODO: Figure out a way to expire tokens. For some ideas, visit
      // https://stackoverflow.com/questions/26739167/jwt-json-web-token-automatic-prolongation-of-expiration
      const userInfo = { u: userAuthInfo.email, l: Date.now(), p: userPermissions };
      const token = sign(userInfo, process.env.APP_SECRET, { expiresIn: "5m" });

      return {
        token: token,
        user: {
          i: userAuthInfo.id,
          u: userAuthInfo.email,
          f: userAuthInfo.firstname,
          l: userAuthInfo.lastname,
          r: roleNames
        }
      };
    } else {
      throw new RequestError("Wrong password");
    }
  }
}
