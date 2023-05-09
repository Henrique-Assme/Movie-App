import express from "express";
import ReviewsController from "./reviews.controller.js"

const router = express.Router();
/*res = response, req = request */
router.route("/movie/:id").get(ReviewsController.apiGetReviews);/*: sinaliza que id é uma variável */
router.route("/new").post(ReviewsController.apiPostReview);
router.route("/:id")
    .get(ReviewsController.apiGetReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview);
export default router;  