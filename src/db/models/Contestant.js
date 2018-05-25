import BaseEntity from './BaseEntity.js';

export class Contestant extends BaseEntity {
  constructor() {
    super();
    this.votes = 0;
    this.won = false;
    this.member_id = 0;
    this.election_id = 0;
  }
}
