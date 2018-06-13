import knex from "../connection";

export class BaseEntityService {
  constructor(tableName) {
    this._tableName = tableName;
    this._connector = knex;
  }

  get connector() {
    return this._connector;
  }

  get tableName() {
    return this._tableName;
  }

  async getAll() {
    return await this.connector.table(this.tableName).select();
  }

  async getById(entityId) {
    if (!entityId) return null;
    return await this.connector
      .table(this.tableName)
      .where({ id: entityId })
      .first();
  }

  async getByIds(entityIds) {
    if (!entityIds || entityIds.length == 0) return null;
    return await this.connector.table(this.tableName).whereIn("id", entityIds);
  }

  async save(record) {
    if (record)
      return await this.connector
        .table(this.tableName)
        .insert(record)
        .returning("*");
  }
}
