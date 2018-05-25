import { BaseEntityService } from "./baseentity.service";

export class ContestantService extends BaseEntityService {
  constructor() {
    super("contestants");
  }

  async getByElectionId(electionId) {
    return await this.connector
      .table(this.tableName)
      .where({ election_id: electionId });
  }
}
