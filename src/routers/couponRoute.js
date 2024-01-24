import express from 'express';
import { isLogin } from '../common/middlewares/isLogin.js';
import { isAdmin } from '../common/middlewares/isAdmin.js';;
import CouponController from '../lib/controllers/CouponController.js';
const couponRoute = express.Router();
couponRoute.post("/",isLogin,isAdmin,CouponController.createCoupon);
couponRoute.get("/",CouponController.getAllCoupons);
couponRoute.get("/:id",CouponController.getCoupon);
couponRoute.put("/:id",isLogin,isAdmin,CouponController.updateCoupon);
couponRoute.delete("/:id",isLogin,isAdmin,CouponController.deleteCoupon);

export default couponRoute;