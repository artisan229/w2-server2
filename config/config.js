require('dotenv').config();

module.exports = {
  "development": {
    "username": "admin",
    "password": process.env.AWS_RDS_PASSWORD,
    "database": "w2-server2",
    "host": process.env.AWS_RDS_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "admin",
    "password": process.env.AWS_RDS_PASSWORD,
    "database": "w2-server2",
    "host": process.env.AWS_RDS_HOST,
    "dialect": "mysql"
  }
}
