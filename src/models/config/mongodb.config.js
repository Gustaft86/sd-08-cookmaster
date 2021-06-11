const { MongoClient } = require('mongodb');
require('dotenv/config');

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

exports. connect = () =>
  MongoClient.connect(process.env.MONGO_DB_URL || MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => console.error(err) && process.exit(1));
