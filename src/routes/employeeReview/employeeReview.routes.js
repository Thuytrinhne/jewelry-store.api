import express from "express";

import {
  createReview,
  checkReviewToken,
  generateReviewToken,
} from "../../controllers/review.controller.js";

const router = express.Router();

router.post("", createReview);
router.post("/check-token", checkReviewToken);
router.post("/generate-review-token", generateReviewToken);

export default router;
