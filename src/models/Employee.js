import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const Employee = sequelize.define(
  "Employee",
  {
    EmpID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    EmpCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EmpName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Active: {
      type: DataTypes.INTEGER, // 1 = active, 0 = inactive
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "Employees",
    timestamps: false,
  }
);

export default Employee;
