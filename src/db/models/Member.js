import BaseEntity from './BaseEntity.js';

export class Member extends BaseEntity {
  constructor() {
    super();
    this.email = "";
    this.passwordHash = "";
    this.lastname = "";
    this.firstname = "";
    this.regnumber = "";
  }
}
