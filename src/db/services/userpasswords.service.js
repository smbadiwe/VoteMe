import { BaseEntityService } from "./baseentity.service";

export default class UserPasswordService extends BaseEntityService {
  constructor() {
    super("userpasswords");
  }

  async getCurrentPassword(memberId) {
    return await this.connector
      .table(this.tableName)
      .where({ userId: memberId })
      .orderBy("passwordsetdate", "desc")
      .first();
  }
}
