import BaseEntity from "./BaseEntity.js";

/**
 *
 */
export class EmailAccount extends BaseEntity {
  constructor() {
    super();
    this.name = "";
    this.email = "";
    this.smtpUsername = "";
    this.smtpPassword = "";
    this.useDefaultCredentials = false;
    this.smtpHost = "";
    this.smtpPort = 0;
    this.secureSsl = true;
    this.isDefault = false;
  }
}
