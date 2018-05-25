import { BaseEntityService } from "./baseentity.service";

export default class MemberService extends BaseEntityService {
  constructor() {
    super("members");
  }

  async getByUsername(email) {
    return await this.connector
      .table(this.tableName)
      .where({ email: email })
      .first();
  }
}
