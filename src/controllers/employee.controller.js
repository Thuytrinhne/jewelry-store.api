import Employee from "../models/Employee.js";

// GET /api/employees?status=1
export async function getEmployees(req, res) {
  try {
    const statusParam = req.query.status; // "1" hoặc "0"

    let whereCondition = {};
    if (statusParam === "1") {
      whereCondition.Active = 1;
    } else if (statusParam === "0") {
      whereCondition.Active = 0;
    }

    const employees = await Employee.findAll({
      where: whereCondition,
      attributes: ["EmpID", "EmpName"],
      order: [["EmpName", "ASC"]],
    });

    res.status(200).json(employees);
  } catch (err) {
    console.error("❌ Error fetching employees:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
}
