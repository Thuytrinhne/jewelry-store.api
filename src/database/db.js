// src/database/db.js
import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config(); // load .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mssql",
  }
);

export default sequelize;
