const {MongoClient} = require('mongodb');
const url = process.env.MONGOOSE_CONNECTION;
const client = new MongoClient(url);


module.exports = client;
