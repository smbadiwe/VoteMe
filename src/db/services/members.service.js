import { BaseEntityService } from "./baseentity.service";

export class MemberService extends BaseEntityService {
  constructor() {
    super("members");
  }

  async getByUsername(email) {
    return await this.connector
      .table(this.tableName)
      .select("*")
      .where({ email: email })
      .first();
  }
}
