const Mongo = require('mongodb');

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

  defaultConnectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }

  constructor(connectionString, connectionOptions, database, collection) {
    this.database = database ? database : "";
    this.collection = collection ? collection : "";
    this.connectionString = connectionString ? connectionString : "";
    this.connectionOptions = connectionOptions ? {
      ...this.defaultConnectionOptions,
      ...connectionOptions,
    } : this.defaultConnectionOptions;
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

async function a() {
  const str = process.env.MONGO_CONNECTION_STRING || "mongodb+srv://oze:Picante@mdb-0-fxohe.azure.mongodb.net/test?retryWrites=true&w=majority";
  const mdb = new MongoDatabase(str);

  try {
    await mdb.connect();
    const datas = await mdb.getAllDocuments("test", "Testing");
    console.log(datas);
    console.log("\r\n\r\nDone.\r\n");
    mdb.close();
  } catch (err) {
    console.trace(err);
    mdb.close();
  }
}

(async () => {
  await a();
})();