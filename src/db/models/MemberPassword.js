import BaseEntity from './BaseEntity.js';

export class MemberPassword extends BaseEntity {
  constructor() {
    super();
    this.passwordHash = "";
    this.passwordsetdate = new Date().now();
    this.member_id = 0;
  }
}
