import express from "express";

import {
  createReview,
  checkReviewToken,
} from "../../controllers/review.controller.js";

const router = express.Router();

router.post("", createReview);
router.post("/check-token", checkReviewToken);

export default router;
