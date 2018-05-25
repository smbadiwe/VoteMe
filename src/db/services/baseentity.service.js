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
    return await this.connector
      .table(this.tableName)
      .where({ id: entityId })
      .first();
  }

  async save(record) {
    if (record)
      return await this.connector.table(this.tableName).insert(record);
  }
}
