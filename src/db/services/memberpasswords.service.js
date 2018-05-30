import { BaseEntityService } from "./baseentity.service";

export default class MemberPasswordService extends BaseEntityService {
  constructor() {
    super("memberpasswords");
  }

  async getCurrentPassword(memberId) {
    return await this.connector
      .table(this.tableName)
      .where({ memberId: memberId })
      .orderBy("passwordsetdate", "desc")
      .first();
  }
}
