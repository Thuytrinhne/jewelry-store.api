import express from "express";
import { getEmployees } from "../../controllers/employee.controller.js";

const router = express.Router();

// GET employees
router.get("", getEmployees);

export default router;
