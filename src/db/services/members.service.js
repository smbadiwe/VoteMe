import { BaseEntityService } from "./baseentity.service";
import { Member } from "../models/Member";
import { json } from "body-parser";

export class MemberService extends BaseEntityService {
  constructor() {
    super("members");
  }

  getByUsername(username) {
    return this.getConnector()
      .table(this.getTableName())
      .select("*")
      .where({ email: username })
      .first()
      .then(item => {
        console.log(item);
        return {
          error: false,
          data: item
        };
      })
      .catch(err => {
        console.log(err);
        return {
          error: true,
          data: {
            message: err.message
          }
        };
      });
  }
}
