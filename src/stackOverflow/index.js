/**
 * HELPING WITH THIS QUESTION:
 * https://stackoverflow.com/questions/62783879/toggle-mongo-document-date-property-with-single-query
 */

const mongodb = require('../mongo.js');

module.exports = async function() {
  try {
    const db = 'test';
    const collection = 'update';
    const client = await mongodb.getClient();

    const update = [
      {
        $set: {
          readAt: {
            $cond: [
              {
                $eq: ['$readAt', null],
              },
              '$$NOW',
              null,
            ],
          },
        },
      },
    ];

    const updatedDocs = await mongodb.updateDoc(client, db, collection, { age: 22 }, update);
    console.log(updatedDocs);

    client.close();
  } catch (err) {
    console.trace(err);
    client.close();
  } 
}