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

  getAll() {
    return this.connector
      .table(this.tableName)
      .select("*")
      .then(rows => {
        return {
          error: false,
          data: rows
        };
      })
      .catch(err => {
        console.log(err);
        return {
          error: true,
          data: {
            message: "Database error occurred"
          }
        };
      });
  }

  getById(entityId) {
    return this.connector
      .table(this.tableName)
      .select("*")
      .where({ id: entityId })
      .first()
      .then(item => {
        console.log(item);
        return {
          error: false,
          data: item
        };
      })
      .catch(err => {
        console.log(err);
        return {
          error: true,
          data: {
            message: "Database error occurred"
          }
        };
      });
  }
}
