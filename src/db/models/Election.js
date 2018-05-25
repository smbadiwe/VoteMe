import BaseEntity from './BaseEntity.js';

/**
 * Ths represents a specific election for a specific office. 
 * E.g. General Secretary for 2019 Tenure.
 */
export class Election extends BaseEntity {
  constructor() {
    super();
    this.name = "";
    this.year = new Date().getFullYear();
    this.electionday = new Date();
  }
}
