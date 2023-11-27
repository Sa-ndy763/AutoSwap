import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  sendEmail,
  changePwd,
  addWishList,
  removeWishList,
  getWishlistProducts,
  googleLogin,
  fbLogin
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, getUsers);
router.post("/login", authUser);
router.post("/email-send",sendEmail);
router.post("/change-password",changePwd);
router.post("/social_auth/google",googleLogin)
router.post("/social_auth/fb",fbLogin)
router.route('/getwishlists').get(protect,getWishlistProducts)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect,  getUserById)
  .put(protect,  updateUser);

router.route('/wishlist').post(protect, addWishList)

router.route('/:id/wishlist').delete(protect, removeWishList)

export default router;
