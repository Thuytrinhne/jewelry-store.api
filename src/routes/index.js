import express from "express";
import employeeReview from "./employeeReview/employeeReview.routes.js";
import employee from "./employee/employee.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello API" });
});

export default function route(app) {
  app.use("/", router);
  app.use("/api/reviews", employeeReview);
  app.use("/api/employees", employee);
}
