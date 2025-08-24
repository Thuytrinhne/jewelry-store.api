import EmployeeReview from "../models/EmployeeReview.js";
import Employee from "../models/Employee.js";

import jwt from "jsonwebtoken";

// POST /api/reviews
export async function createReview(req, res) {
  const { reviewToken, rating, feedback, employeeId } = req.body;
  if (!reviewToken)
    return res.status(400).json({ message: "Thiếu reviewToken" });

  try {
    const { invoiceId, department } = decodeReviewToken(reviewToken);

    // Kiểm tra review đã tồn tại
    const existingReview = await EmployeeReview.findAll({
      where: { InvoiceID: invoiceId },
    });

    if (existingReview.length >= 2) {
      return res.status(400).json({ message: "Hóa đơn đã được đánh giá" });
    }

    // Nếu nhân viên này đã được đánh giá trong hóa đơn -> chặn
    if (existingReview.some((r) => r.EmployeeID === employeeId)) {
      return res
        .status(400)
        .json({ message: "Nhân viên này đã được đánh giá cho hóa đơn này" });
    }

    const employee = await Employee.findOne({
      where: { EmpID: employeeId },
    });
    if (!employee) {
      return res.status(404).json({ message: "Nhân viên không tồn tại" });
    }

    const review = await EmployeeReview.create({
      EmployeeID: employeeId,
      InvoiceID: invoiceId,
      Department: department,
      Rating: rating,
      Feedback: feedback,
      EmployeeName: employee.EmpName,
    });

    res
      .status(201)
      .json({ message: "Đánh giá đã được lưu thành công", review });
  } catch (err) {
    console.error("❌ Error creating review:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
}

// GET /api/reviews/check?invoiceId=xxx
export async function checkReview(req, res) {
  const { invoiceId } = req.query;

  if (!invoiceId) {
    return res.status(400).json({ message: "Thiếu thông tin" });
  }

  try {
    const existingReview = await EmployeeReview.findOne({
      InvoiceID: invoiceId,
    });
    console.log("here", existingReview);
    res.status(200).json({
      hasReviewed: !!existingReview,
    });
  } catch (err) {
    console.error("❌ Error checking review:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
}

const SECRET_KEY = process.env.REVIEW_SECRET;

// Tạo token (ví dụ khi gửi link đánh giá)
export function generateReviewToken({ employeeId, invoiceId, department }) {
  return jwt.sign({ employeeId, invoiceId, department }, SECRET_KEY, {
    expiresIn: "1d",
  });
}

// POST /api/reviews/check-token
export async function checkReviewToken(req, res) {
  const { reviewToken } = req.body;
  if (!reviewToken)
    return res.status(400).json({ message: "Thiếu reviewToken" });

  try {
    const decoded = decodeReviewToken(reviewToken);
    const { employeeId, invoiceId, department } = decoded;
    console.log(invoiceId);

    const existingReview = await EmployeeReview.findAll({
      where: { InvoiceID: invoiceId }, // ✅ phải dùng `where`
    });

    res.status(200).json({
      hasReviewed: existingReview.length >= 2,
      employeeId,
      invoiceId,
      department,
      employeeIdsReviewed: existingReview.map((r) => r.EmployeeID),
    });
  } catch (err) {
    console.error("❌ Error checking review token:", err);
    res.status(400).json({ message: err.message });
  }
}

export function decodeReviewToken(token) {
  try {
    const SECRET_KEY = process.env["REVIEW_SECRET"];
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error("Token không hợp lệ hoặc đã hết hạn");
  }
}
