import BaseEntity from './BaseEntity.js';

export class Election extends BaseEntity {
  constructor() {
    super();
    this.name = "";
    this.year = new Date().getFullYear();
    this.electionday = new Date();
  }
}
