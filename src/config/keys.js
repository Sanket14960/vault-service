const {
  DB_USER = "root",
  DB_PASS = "password",
  DB_HOST = "localhost",
  DB_PORT = 27017,
  DB_NAME = "local"
} = process.env;

module.exports = {
  mongoURI: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`
}