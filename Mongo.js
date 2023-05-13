const {MongoClient} = require('mongodb');
const url = process.env.MONGOOSE_CONNECTION || 'mongodb+srv://ritik:cevEMkAzK8a1qVx5@airbuscluster0.whyczf5.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url);


module.exports = client;
