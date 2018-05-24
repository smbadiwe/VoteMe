import BaseEntity from './BaseEntity.js';

export class Member extends BaseEntity {
  constructor() {
    super();
    this.email = "";
    this.password = "";
    this.lastname = "";
    this.firstname = "";
    this.regnumber = "";
  }
}
