import BaseEntity from "./BaseEntity.js";

/**
 * Represents a member's login credentials
 */
export class MemberPassword extends BaseEntity {
  constructor() {
    super();
    this.passwordHash = "";
    this.passwordsetdate = new Date().now();
    this.memberId = 0;
  }
}
