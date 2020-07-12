const Mongo = require('mongodb');

const DEFAULT_CONNECTION_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

/**
 * @param connectionString {String} MongoDB Connection String
 * @param connectionOptions {Object} MongoDB Connection Options (defaults are used here)
 * @param database {String} Default Database Used In Methods - OPTIONAL
 * @param collection {String} Default Collection - OPTIONAL
 */

class MongoDatabase {
  Mongo = Mongo;
  client = Mongo.MongoClient;
  connectionString = "";
  connectionOptions = {};
  database = "";
  collection = "";

  constructor(connectionString, connectionOptions, database, collection) {
    this.database = database ? database : "";
    this.collection = collection ? collection : "";
    this.connectionString = connectionString ? connectionString : "";
    this.connectionOptions = {
      ...DEFAULT_CONNECTION_OPTIONS,
      ...connectionOptions,
    }
    // this.connectionOptions = connectionOptions ? { ...DEFAULT_CONNECTION_OPTIONS, ...connectionOptions } : DEFAULT_CONNECTION_OPTIONS;
  }

  async connect () {
    try {
      this.client = await this.Mongo.MongoClient
        .connect(this.connectionString, this.connectionOptions);
    } catch (err) {
      throw err;
    }
  }

  async getAllDocuments (database = "", collection = "") {
    try {
      return await this.client
        .db(this._getDb(database))
        .collection(this._getCol(collection))
        .find().toArray();
    } catch (err) {
      throw err;
    }
  }

  async updateDoc (
    database = "",
    collection = "",
    query = "",
    update = {}
  ) {
    return await this.client
      .db(this._getDb(database))
      .collection(this._getCol(collection))
      .update(query, update);
  };

  async close() {
    if (this.client) this.client.close();
  }

  _getDb(db) {
    return this.database === "" ? db : this.database;
  }

  _getCol(col) {
    return this.collection === "" ? col : this.collection;
  }
}