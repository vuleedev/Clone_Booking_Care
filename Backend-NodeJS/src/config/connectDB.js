const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("testconnectdb", "root", null, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
