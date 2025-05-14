import express from "express";
const router = express.Router();
import {
  createReview,
  getReviews,
  getMyReviews,
  getMyReview,
  getAvgRating,
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";
import { auth, isUser, isOrganizer, isAdmin } from "../middlewares/auth.middleware.js";

router.post("/create-review", auth, isUser, createReview);
router.put("/update-review/:reviewtId", auth, isUser, updateReview);
router.delete("/delete-review/:reviewId", auth, isUser,isAdmin, deleteReview);
router.get("/get-reviews/:eventId", getReviews);
router.get("/get-all-reviews", auth, isAdmin,isUser, getMyReviews);
router.get("/get-reviews/:eventId", auth, isAdmin,isUser, getMyReview);
router.get("/get-avg-rating/:eventId", getAvgRating);

export default router;
