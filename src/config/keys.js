const {
  DB_USER = "Sanket",
  DB_PASS = "SZ7Bsqz3t7jDt15Q",
  DB_HOST = "manager.31rds.mongodb.net",
  DB_NAME = "myFirstDatabase"
} = process.env;

module.exports = {
  mongoURI: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
}