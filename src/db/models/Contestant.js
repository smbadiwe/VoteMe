import BaseEntity from './BaseEntity.js';

/**
 * Contestant is a Member running for office in a given Election.
 */
export class Contestant extends BaseEntity {
  constructor() {
    super();
    this.votes = 0;
    this.won = false;
    this.member_id = 0;
    this.election_id = 0;
  }
}
