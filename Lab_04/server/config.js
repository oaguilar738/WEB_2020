const PORT = process.env.PORT || '8000';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
const MONGO_DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME || 'username';
const MONGO_DB_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD || 'password';

module.exports = {
    PORT,
    MONGO_URI,
    MONGO_DB_USER,
    MONGO_DB_PASS
}