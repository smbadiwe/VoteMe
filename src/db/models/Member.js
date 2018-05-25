import BaseEntity from './BaseEntity.js';

/**
 * This represents someone registered to the organization/group.
 */
export class Member extends BaseEntity {
  constructor() {
    super();
    this.email = "";
    this.phone = "";
    this.lastname = "";
    this.firstname = "";
    this.regnumber = "";
  }
}
