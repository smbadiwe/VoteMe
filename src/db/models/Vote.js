import BaseEntity from "./BaseEntity.js";

/**
 * This represents a specific vote cast by a Member for a Contestant in an Election.
 */
export class Vote extends BaseEntity {
  constructor() {
    super();
    this.memberId = 0;
    this.contestantId = 0;
    this.electionId = 0;
  }
}
