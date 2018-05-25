import BaseEntity from './BaseEntity.js';

/**
 * This represents a specific vote cast by a Member for a Contestant in an Election.
 */
export class Vote extends BaseEntity {
  constructor() {
    super();
    this.member_id = 0;
    this.contestant_id = 0;
    this.election_id = 0;
  }
}
