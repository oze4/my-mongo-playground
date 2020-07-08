const mongo = require('mongodb');

const mongoClient = mongo.MongoClient;

const connection = {
  str: process.env.MONGO_CONNECTION_STRING || '',
  opts: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
};

exports.getClient = async function () {
  return await mongoClient
    .connect(connection.str, connection.opts)
    .catch((err) => console.trace(err));
};

exports.getAllDocs = async function (mongoclient, database, collection) {
  return await mongoclient.db(database).collection(collection).find().toArray();
};

exports.updateDoc = async function (
  mongoclient,
  database,
  collection,
  query,
  update
) {
  return await mongoclient
    .db(database)
    .collection(collection)
    .update(query, update);
};
