export default class BaseEntity {
  constructor() {
    // if (new.target === BaseEntity) {
    //   throw new TypeError("Cannot construct BaseEntity instances directly");
    // }
    this.id = 0;
    this.created_at = new Date().now();
    this.updated_at = null;
    this.disabled = false;
    this.deleted = false;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    if (value < 0) {
      throw new Error("Id should be 0 or positive.");
      return;
    }
    this._id = value;
  }
}
