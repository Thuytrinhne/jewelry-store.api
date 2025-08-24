import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const EmployeeReview = sequelize.define(
  "EmployeeReview",
  {
    InvoiceID: { type: DataTypes.STRING, allowNull: false },
    EmployeeID: { type: DataTypes.STRING, allowNull: false },
    EmployeeName: { type: DataTypes.STRING, allowNull: false },
    Department: { type: DataTypes.STRING, allowNull: false },
    Rating: { type: DataTypes.INTEGER, allowNull: false },
    Feedback: { type: DataTypes.TEXT },
    CreatedAt: { type: DataTypes.DATE },
  },
  {
    tableName: "EmployeeReviews",
    timestamps: false,
  }
);

export default EmployeeReview;
