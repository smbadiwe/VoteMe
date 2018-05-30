import { BaseEntityService } from "./baseentity.service";

export default class ContestantService extends BaseEntityService {
  constructor() {
    super("contestants");
  }

  async getByElectionId(electionId) {
    return await this.connector.table(this.tableName).where({ electionId: electionId });
  }
}
