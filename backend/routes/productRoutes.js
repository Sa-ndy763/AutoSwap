import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct, 
  updateProduct,
  createProduct,
  getTopProducts,
  createProductReview
} from "../controller/productController.js";
import { protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect,  createProduct);
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, deleteProduct)
  .put(protect,  updateProduct);

export default router;
