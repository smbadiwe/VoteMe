import { BaseEntityService } from "./baseentity.service";
import { UserRoleService, PermissionService } from "./";
import { RequestError } from "../../ValidationErrors";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

export default class UserService extends BaseEntityService {
  constructor() {
    super("users");
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
      const userInfo = { u: userAuthInfo.email, p: userPermissions };
      const token = sign(userInfo, process.env.APP_SECRET);

      return {
        token: token,
        user: {
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
