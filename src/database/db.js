// // src/database/db.js
import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config(); // load .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,
        enableArithAbort: true,
        trustServerCertificate: true,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối database thành công!");
  })
  .catch((error) => {
    console.error("Kết nối database thất bại:", error);
  });

export default sequelize;
